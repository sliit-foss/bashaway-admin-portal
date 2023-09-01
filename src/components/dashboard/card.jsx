import { twMerge } from "tailwind-merge";
import { Skeleton } from "@sliit-foss/bashaway-ui/components";
import { Footnote } from "@sliit-foss/bashaway-ui/typography";

const DashboardCard = ({ icon: Icon, title, value, className }) => {
  if (!value)
    return (
      <Skeleton
        containerClassName="flex w-full h-full"
        className="w-full h-full p-5 flex flex-col gap-2 rounded-[20px] "
      >
        <Skeleton className="w-6 h-6 md:w-8 md:h-8 rounded-lg" shade="dark" />
        <Skeleton className="w-12 h-6 md:h-8 rounded-lg mt-3 md:mt-4" shade="dark" />
        <Skeleton
          className="w-[90px] sm:w-32 md:w-48 lg:w-[100px] xl:w-40 2xl:w-48 h-3.5 md:h-5 md:mt-1 rounded-lg"
          shade="dark"
        />
      </Skeleton>
    );
  return (
    <div
      className={twMerge(
        "p-5 rounded-[20px] group hover:bg-gray-100/60 hover:border-gray-100/60 text-black border flex flex-col gap-1 md:gap-2 cursor-default transition-all duration-medium",
        className
      )}
    >
      <Icon className="opacity-20 group-hover:opacity-30 w-6 h-6 md:w-8 md:h-8 text-black transition-all duration-medium" />
      <span className="text-2xl md:text-3xl lg:text-[40px] mt-2 md:mt-4">{value}</span>
      <Footnote className="font-medium text-black/40 group-hover:text-black/[0.55] text-start transition-all duration-medium">{title}</Footnote>
    </div>
  );
};

export default DashboardCard;
