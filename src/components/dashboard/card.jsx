import { Footnote } from "@sliit-foss/bashaway-ui/typography";
import { twMerge } from "tailwind-merge";

const DashboardCard = ({ icon: Icon, title, value, className }) => {
    return (<div className={twMerge("p-5 rounded-[20px] border flex flex-col gap-1 md:gap-2", className)}>
        <Icon className="opacity-20 w-6 h-6 md:w-8 md:h-8" />
        <span className="text-2xl md:text-3xl lg:text-[40px] mt-2 md:mt-5">{value}</span>
        <Footnote className="font-medium text-black/40 text-start">{title}</Footnote>
    </div>)
}

export default DashboardCard