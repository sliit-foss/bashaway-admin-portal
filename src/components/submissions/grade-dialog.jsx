import { useSelector } from "react-redux";
import { store } from "@/store";
import { useGradeSubmissionMutation } from "@/store/api";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  Input,
  toast
} from "@sliit-foss/bashaway-ui/components";
import { toggleGradeSubmissionDialog } from "@/store/reducers/ui/submission";

const close = () => store.dispatch(toggleGradeSubmissionDialog(false));

const GradeDialog = ({ refresh }) => {
  const selectedSubmission = useSelector((store) => store.ui.submission.selected);
  const open = useSelector((store) => store.ui.submission.showGradeSubmissionDialog);

  const [gradeSubmission, {isLoading}] = useGradeSubmissionMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await gradeSubmission({
      id: selectedSubmission._id, data: {
        score: e.target.score.value
      }
    }).unwrap().then(() => {
      toast({ title: `Question updated successfully` })
      close();
      refresh();
    });
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={(open) => {
        if (!open) close();
      }}
    >
      <AlertDialogContent overlayClassName="z-[201]" className="z-[201]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <AlertDialogHeader>
            <AlertDialogTitle>Grade Submission</AlertDialogTitle>
          </AlertDialogHeader>
          <Input placeholder="Score" name="score" type="number" required className="sm:h-14" />
          <AlertDialogFooter className="mt-4">
            <Button type="submit" loading={isLoading}>
              Grade
            </Button>
            <Button variant="secondary" type="button" onClick={close}>
              Cancel
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default GradeDialog;
