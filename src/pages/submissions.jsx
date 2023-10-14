import { useState } from "react";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { GradeDialog, Submission, SubmissionListSkeleton } from "@/components/submissions";
import { submissionFilters, submissionSorts } from "@/filters";
import { useTitle } from "@/hooks";
import {
  useGetAllSubmissionsQuery,
  useGetAllUsersQuery,
  useGetQuestionByIdQuery,
  useLazyGetAllSubmissionsQuery
} from "@/store/api";
import {
  AnimatedSwitcher,
  BreadCrumbs,
  Filters,
  NoRecords,
  Pagination,
  Skeleton,
  Sorts
} from "@sliit-foss/bashaway-ui/components";
import { Body2 } from "@sliit-foss/bashaway-ui/typography";
import { computeFilterQuery, computeSortQuery } from "@sliit-foss/bashaway-ui/utils";

const Submissions = () => {
  const { id: questionId } = useParams();

  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState(computeFilterQuery(submissionFilters));
  const [sorts, setSorts] = useState(computeSortQuery(submissionSorts));

  const [hoveredCardIndex, setHoveredCardIndex] = useState(-1);

  const { data: { data: question } = {} } = useGetQuestionByIdQuery(questionId);

  const { data: { data: teams } = {} } = useGetAllUsersQuery({ filters: `filter[role]=GROUP` });

  const {
    data: submissions,
    isFetching,
    isError
  } = useGetAllSubmissionsQuery({ filters: `filter[question]=${questionId}&${filters}`, sorts, page });

  const [trigger] = useLazyGetAllSubmissionsQuery();

  const refresh = () => trigger({ filters: `filter[question]=${questionId}&${filters}`, sorts, page });

  const filterOptions = useMemo(
    () =>
      submissionFilters.map((filter) => {
        if (filter.key == "user" && teams)
          filter.options = teams?.map((team) => ({
            key: team._id,
            label: team.name
          }));
        return filter;
      }),
    [teams]
  );

  useTitle("Submissions | Bashaway");

  return (
    <>
      <BreadCrumbs
        breadcrumbs={[
          "Home",
          {
            label: "Challenge",
            path: `/questions/${questionId}`
          },
          "Submissions"
        ]}
        className="mt-4"
      />
      <div className="w-full h-full min-h-[70vh] flex flex-col border py-7 px-5 md:px-7 rounded-3xl mt-12 lg:mt-8">
        <AnimatedSwitcher
          show={!!question?.name}
          component={<Body2 className="text-[22px] font-medium">{question?.name}</Body2>}
          alternateComponent={<Skeleton className="h-[27px] lg:h-[30px] w-72" />}
        />
        <div className="divider !bg-black/10 mt-4 mb-7" />
        <div className="w-full flex flex-col md:flex-row gap-6">
          <Filters
            filters={filterOptions}
            setFilterQuery={setFilters}
            styles={{
              root: "md:w-7/12 lg:w-6/12 xl:w-5/12",
              filter: "md:w-3/4 lg:w-1/2 xl:w-5/12 2xl:w-4/12",
              input: "sm:h-12"
            }}
          />
          <div className="xl:w-3/12" />
          <Sorts
            sorts={submissionSorts}
            setSortQuery={setSorts}
            styles={{
              root: "md:w-5/12 lg:w-6/12 xl:w-4/12 justify-end",
              sort: "md:w-full justify-center md:justify-end"
            }}
          />
        </div>
        <div className="flex flex-col flex-1 justify-between mt-8">
          <AnimatedSwitcher
            show={isFetching || isError}
            className={`flex-1 flex flex-col gap-6`}
            component={<SubmissionListSkeleton />}
            alternateComponent={
              submissions?.data?.docs?.length ? (
                <>
                  {submissions?.data?.docs?.map((submission, index) => (
                    <Submission
                      key={`submission-${submission._id}`}
                      submission={submission}
                      onMouseEnter={() => setHoveredCardIndex(index)}
                      onMouseLeave={() => setHoveredCardIndex(-1)}
                      highlight={index === 0 && hoveredCardIndex === -1}
                    />
                  ))}
                </>
              ) : (
                <div className="h-full flex flex-1 items-center">
                  <NoRecords text="No uploaded submissions" />
                </div>
              )
            }
          />
          <div className="w-full flex justify-center items-center mt-6 mb-2">
            <Pagination
              currentPage={page}
              onPageChange={(newPage) => setPage(newPage)}
              totalPages={submissions?.data?.totalPages}
            />
          </div>
        </div>
      </div>
      <GradeDialog refresh={refresh} />
    </>
  );
};

export default Submissions;
