import { useState } from "react";
import { Plus } from "lucide-react";
import { Question, QuestionDialog, QuestionGridSkeleton } from "@/components/questions";
import { questionFilters, questionSorts } from "@/filters";
import { useTitle } from "@/hooks";
import { store } from "@/store";
import { useAuthUserQuery, useGetQuestionsQuery, useLazyGetQuestionsQuery } from "@/store/api";
import { setSelectedQuestion, toggleAddQuestionDialog } from "@/store/reducers/ui/question";
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

  useTitle("Challenges | Bashaway");

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center gap-6 mb-8 mt-4">
        <div className="w-full flex flex-col md:flex-row gap-6">
          {authUser?.role === "ADMIN" && (
            <Button
              className="w-full md:w-5/12 lg:w-4/12 xl:w-3/12 2xl:w-2/12 py-[13px] sm:py-4 md:py-1.5"
              onClick={onAddClick}
            >
              <Plus strokeWidth="2.5" />
              Add Question
            </Button>
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
    </>
  );
};

export default Questions;
