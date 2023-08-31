import { Skeleton } from "@sliit-foss/bashaway-ui/components";

const UserGridSkeleton = ({ className }) => {
  return (
    <div className={className}>
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="group h-full w-full animated-border text-border from-black/20 to-border p-5 rounded-3xl"
        >
          <Skeleton containerClassName="flex" className="flex flex-col p-5 gap-2 rounded-2xl py-6">
            <Skeleton className="w-3/4 md:w-1/2 h-[1.1rem] md:h-[1.35rem]" shade="dark" />
            <Skeleton className="w-4/12 h-[1.2rem] mt-2.5 mb-[0.11rem]" shade="dark" />
            <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-1 mt-1 text-sm sm:text-base items-center text-black/40 z-50">
              <Skeleton className="w-[40px] h-[40px]" shade="dark" />
              <Skeleton className="w-[80px] h-[40px]" shade="dark" />
            </div>
          </Skeleton>
        </div>
      ))}
    </div>
  );
};

export default UserGridSkeleton;
