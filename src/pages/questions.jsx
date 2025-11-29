import { useState } from "react";
import { Ban, Plus, Power } from "lucide-react";
import { BulkQuestionStatusUpdateDialog, Question, QuestionDialog, QuestionGridSkeleton } from "@/components/questions";
import { questionFilters, questionSorts } from "@/filters";
import { useTitle } from "@/hooks";
import { store } from "@/store";
import { useAuthUserQuery, useGetQuestionsQuery, useLazyGetQuestionsQuery } from "@/store/api";
import {
  setSelectedQuestion,
  toggleAddQuestionDialog,
  toggleBulkQuestionStatusUpdateDialog
} from "@/store/reducers/ui/question";
import { AnimatedSwitcher, Button, Filters, NoRecords, Pagination, Sorts } from "@sliit-foss/bashaway-ui/components";
import { computeFilterQuery, computeSortQuery } from "@sliit-foss/bashaway-ui/utils";

const gridStyles = "w-full h-full grid grid-cols-1 lg:grid-cols-2 justify-start items-center gap-5";

const onAddClick = () => {
  store.dispatch(setSelectedQuestion(null));
  store.dispatch(toggleAddQuestionDialog(true));
};

const Questions = () => {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState(computeFilterQuery(questionFilters));
  const [sorts, setSorts] = useState(computeSortQuery(questionSorts));

  const { data: questions, isFetching, isError } = useGetQuestionsQuery({ filters, sorts, page });

  const { data: { data: authUser } = {} } = useAuthUserQuery();

  const [trigger] = useLazyGetQuestionsQuery();

  const refresh = () => trigger({ filters, sorts, page });

  const openBulkStatusDialog = (enabled) => {
    store.dispatch(toggleBulkQuestionStatusUpdateDialog({ open: true, enabled }));
  };

  useTitle("Challenges | Bashaway");

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center gap-6 mb-8 mt-4">
        <div className="w-full flex flex-col md:flex-row gap-6">
          {authUser?.role === "ADMIN" && (
            <div className="flex gap-3 shrink-0 justify-end">
              <Button className="w-full py-[13px] sm:py-4 md:py-1.5 whitespace-nowrap" onClick={onAddClick}>
                <Plus strokeWidth="2.5" />
                Add Question
              </Button>
              <div className="rounded-full border-gray-100 border bg-black/10 p-2 flex gap-2">
                <Button
                  className="py-[13px] sm:py-4 md:py-1.5 whitespace-nowrap"
                  variant="secondary"
                  onClick={() => openBulkStatusDialog(false)}
                >
                  <Ban size={18} strokeWidth="2.5" />
                  <span className="hidden xl:block">Disable All</span>
                </Button>
                <Button
                  className="py-[13px] sm:py-4 md:py-1.5 whitespace-nowrap"
                  variant="secondary"
                  onClick={() => openBulkStatusDialog(true)}
                >
                  <Power size={18} strokeWidth="2.5" />
                  <span className="hidden xl:block">Enable All</span>
                </Button>
              </div>
            </div>
          )}
          <Filters filters={questionFilters} setFilterQuery={setFilters} />
        </div>
        <Sorts sorts={questionSorts} setSortQuery={setSorts} />
      </div>
      <div className="w-full min-h-[60vh] flex flex-col gap-12 justify-between items-center">
        <AnimatedSwitcher
          show={isFetching || isError}
          component={<QuestionGridSkeleton className={gridStyles} />}
          alternateComponent={
            questions?.data?.docs?.length ? (
              <div className={gridStyles}>
                {questions?.data?.docs?.map((question) => (
                  <Question key={`question-list-${question.id}`} question={question} />
                ))}
              </div>
            ) : (
              <NoRecords text="No challenges have been uploaded yet" className="mt-12" />
            )
          }
        />
        <div className="w-full flex justify-center items-center mt-6 mb-2">
          <Pagination
            currentPage={page}
            onPageChange={(newPage) => setPage(newPage)}
            totalPages={questions?.data?.totalPages}
          />
        </div>
      </div>
      <QuestionDialog refresh={refresh} />
      <BulkQuestionStatusUpdateDialog refresh={refresh} />
    </>
  );
};

export default Questions;
