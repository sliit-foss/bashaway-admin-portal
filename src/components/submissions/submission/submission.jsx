import { CheckCircle2, XCircle } from "lucide-react";
import { default as moment } from "moment-timezone";
import { twMerge } from "tailwind-merge";
import { Metric } from "@sliit-foss/bashaway-ui/components";
import { Body3, Caption } from "@sliit-foss/bashaway-ui/typography";
import { Actions } from "./actions";

const Submission = ({ submission, ...props }) => {
  return (
    <div
      className={twMerge(
        "group w-full flex flex-col md:flex-row items-center justify-between gap-2 border bg-gray-100/80 border-black/[0.05]",
        "rounded-xl py-6 md:py-4 px-5 cursor-default transition-all duration-medium"
      )}
      {...props}
    >
      <div className="w-full flex flex-col items-center md:items-start gap-2">
        <div className="flex flex-col md:flex-row gap-3 items-center mb-3 md:mb-0">
          <Body3 className="font-medium">{submission?.user?.name}</Body3>
          <Caption className="text-black/40">
            @ {moment(submission.created_at).tz("Asia/Colombo").format("DD MMM YYYY hh:mm A")}
          </Caption>
        </div>
        <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-3 text-sm sm:text-base items-center">
          <Metric metric="Max Score" value={(submission.question.max_score ?? 0)?.toString().padStart(2, "0")} />
          <Metric
            metric="Marked"
            value={
              submission.graded_by || submission.automatically_graded ? (
                <CheckCircle2 size={16} />
              ) : (
                <XCircle size={16} />
              )
            }
          />
          <Metric metric="Score" value={(submission.score ?? 0)?.toString().padStart(2, "0")} />
        </div>
      </div>
      <Actions submission={submission} buttonClassName="py-[5px] sm:py-1.5" />
    </div>
  );
};

export default Submission;
