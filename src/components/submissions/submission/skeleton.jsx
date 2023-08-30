import { Metric, Skeleton } from "@sliit-foss/bashaway-ui/components";
import { Actions } from "./actions";
import { useBreakpoint } from "@/hooks";

const SubmissionListSkeleton = () => {

  const { md } = useBreakpoint();

  return (
    <>
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton
          key={i}
          className="w-full flex flex-col md:flex-row items-center md:items-center justify-between gap-2 rounded-xl py-6 md:py-4 px-5"
          single
        >
          <div className="w-full flex flex-col items-center md:items-start gap-2 md:gap-1">
            <Skeleton className="w-[280px] md:w-[340px] h-[1.4rem] sm:h-[1.45rem] md:h-[1.45rem] lg:h-[1.55rem] mb-[0.2rem]" shade="dark" single />
            {
              !md && <Skeleton className="w-[240px] md:w-[240px] h-[1.4rem] sm:h-[1.45rem] md:h-[1.45rem] lg:h-[1.55rem]" shade="dark" single />
            }
            <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-3 text-sm sm:text-base items-center mt-3 md:mt-2 z-50">
              <Metric metric="Max Score" />
              <Metric metric="Marked" />
              <Metric metric="Score"/>
            </div>
          </div>
          <Actions className="z-50" buttonClassName="py-[9px] sm:py-2.5" />
        </Skeleton>
      ))}
    </>
  );
};

export default SubmissionListSkeleton;
