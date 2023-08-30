import { Skeleton } from "@sliit-foss/bashaway-ui/components";

const QuestionGridSkeleton = ({ className }) => {
  return (
    <div className={className}>
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="group h-full w-full animated-border text-border from-black/20 to-border p-5 rounded-3xl"
        >
          <Skeleton containerClassName="flex" className="flex flex-col p-5 gap-6 rounded-2xl py-6">
            <Skeleton className="w-3/4 md:w-1/2 h-[1.1rem] md:h-[1.35rem] mb-[0.5rem] md:mb-[0.8rem]" shade="dark" />
            <Skeleton className="w-full h-[1.0rem] my-[0.11rem]" count={3} shade="dark" />
            <Skeleton
              containerClassName="flex flex-wrap gap-1.5 mt-[0.1rem]"
              className="w-[4rem] h-[2.6rem] rounded-[7px] z-50"
              count={3}
              shade="dark"
            />
          </Skeleton>
        </div>
      ))}
    </div>
  );
};

export default QuestionGridSkeleton;
