import { ArrowDownToLine, Eye } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { scorekeeperRepositoryLink } from "@/constants";
import { store } from "@/store";
import { useAuthUserQuery } from "@/store/api";
import { setSelectedSubmission, toggleGradeSubmissionDialog } from "@/store/reducers/ui/submission";
import { downloadFile } from "@/utils";
import { Button, IconButton } from "@sliit-foss/bashaway-ui/components";

const onGradeClick = (submission) => {
  store.dispatch(setSelectedSubmission(submission));
  store.dispatch(toggleGradeSubmissionDialog(true));
};

export const Actions = ({ submission, className, buttonClassName }) => {
  const { data: { data: authUser } = {} } = useAuthUserQuery();
  return (
    <div
      className={twMerge(
        "w-full md:w-auto flex flex-row justify-center md:justify-end items-center gap-3 mt-1",
        className
      )}
    >
      {authUser?.role === "ADMIN" && (
        <Button
          className={twMerge("w-full sm:w-auto self-center py", buttonClassName)}
          disabled={!submission}
          onClick={() => onGradeClick(submission)}
        >
          Grade
        </Button>
      )}
      <IconButton
        variant="secondary"
        icon={<Eye size={18} />}
        label="View Results"
        disabled={!submission}
        onClick={() =>
          window.open(`${scorekeeperRepositoryLink}/actions?query=workflow%3A+${submission?._id}`, "_blank")
        }
      />
      <IconButton
        variant="secondary"
        icon={<ArrowDownToLine size={18} />}
        label="Download"
        disabled={!submission}
        onClick={() => downloadFile(submission.link)}
      />
    </div>
  );
};

export default Actions;
