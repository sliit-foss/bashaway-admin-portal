import { useEffect, useState } from "react";
import { Pagination } from "flowbite-react";
import { Button, Filters, NoRecords, Sorts } from "@components/common";
import { Question, QuestionModal } from "@components/questions";
import Layout from "@components/layout";
import { getAllQuestions } from "@services/question";
import { questionFilters, questionSorts } from "@filters/question";

const Questions = () => {
  const [questionRes, setQuestionRes] = useState(null);
  const [page, setPage] = useState(1);
  const [filterQuery, setFilterQuery] = useState("");
  const [sortQuery, setSortQuery] = useState("");

  const [showQuestionModal, setShowQuestionModal] = useState(false);

  const refresh = () => {
    getAllQuestions(filterQuery, sortQuery, page).then((res) => {
      setQuestionRes(res.data);
    });
  };

  useEffect(() => {
    refresh();
  }, [page, filterQuery, sortQuery]);

  return (
    <Layout title="Bashaway | Questions">
      <div className="w-screen min-h-screen flex flex-col justify-center items-center">
        {questionRes && (
          <>
            <div className="w-10/12 flex flex-col justify-center items-start mt-24 mb-5">
              <Filters
                filters={questionFilters}
                setFilterQuery={setFilterQuery}
              />
              <Sorts sorts={questionSorts} setSortQuery={setSortQuery} />
            </div>
            <div className="w-10/12 flex justify-end items-center mb-6">
              <Button
                className="px-12 py-2 font-semibold md:text-xl focus:outline-none focus:ring focus:ring-offset-1 bg-white focus:ring-black focus:ring-opacity-10"
                onClick={() => {
                  setShowQuestionModal(true);
                }}
              >
                Add Question
              </Button>
            </div>
            <div className="w-10/12 min-h-screen flex flex-col justify-between items-center mb-16">
              <div className="w-full h-full flex flex-col justify-start items-center gap-y-6">
                {questionRes.docs?.length > 0 ? (
                  questionRes.docs?.map((question) => {
                    return (
                      <div
                        key={`question-list-${question._id}`}
                        className="w-full flex justify-center items-center"
                      >
                        <Question question={question} />
                      </div>
                    );
                  })
                ) : (
                  <NoRecords text="No Questions Found" className="mt-12" />
                )}
              </div>
              <div className="w-full flex justify-end items-center mt-4 md:mt-0">
                <Pagination
                  currentPage={page}
                  onPageChange={(newPage) => {
                    setPage(newPage);
                  }}
                  showIcons={true}
                  totalPages={questionRes.totalPages}
                />
              </div>
            </div>
          </>
        )}
      </div>
      <QuestionModal
        show={showQuestionModal}
        setShow={setShowQuestionModal}
        refresh={refresh}
      />
    </Layout>
  );
};

export default Questions;
