import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { store } from "@/store";
import { setSelectedQuestion, toggleAddQuestionDialog } from "@/store/reducers/ui/question";
import { Button } from "@sliit-foss/bashaway-ui/components";

const onEditClick = (question) => {
  store.dispatch(setSelectedQuestion(question));
  store.dispatch(toggleAddQuestionDialog(true));
};

const ActionButtons = ({ question, className, buttonClassName }) => {
  const navigate = useNavigate();
  return (
    <div className={twMerge("flex flex-col md:flex-row gap-3 mt-1", className)}>
      <Button
        className={twMerge("py-2 md:py-1.5", buttonClassName)}
        onClick={() => navigate(`/questions/${question._id}/submissions`)}
        disabled={!question}
      >
        View submissions
      </Button>
      <Button
        variant="secondary"
        className={twMerge("bg-transparent", buttonClassName)}
        onClick={() => onEditClick(question)}
        disabled={!question}
      >
        Edit
      </Button>
    </div>
  );
};

export default ActionButtons;
