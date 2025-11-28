import { useSelector } from "react-redux";
import { store } from "@/store";
import { useBulkUpdateQuestionStatusMutation } from "@/store/api";
import { toggleBulkStatusDialog } from "@/store/reducers/ui/question";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  toast
} from "@sliit-foss/bashaway-ui/components";

const close = () => store.dispatch(toggleBulkStatusDialog({ open: false }));

const BulkStatusDialog = ({ refresh }) => {
  const { open, enabled } = useSelector((store) => store.ui.question.bulkStatusDialog);

  const [bulkUpdateStatus, { isLoading }] = useBulkUpdateQuestionStatusMutation();

  const handleConfirm = async () => {
    await bulkUpdateStatus({ enabled })
      .unwrap()
      .then((res) => {
        toast({ title: res.message });
        close();
        refresh();
      });
  };

  const action = enabled ? "enable" : "disable";

  return (
    <AlertDialog open={open} onOpenChange={(open) => !open && close()}>
      <AlertDialogContent overlayClassName="z-[201]" className="z-[201]">
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Bulk {enabled ? "Enable" : "Disable"}</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to {action} ALL questions? This action will affect all questions in the system.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-4">
          <Button onClick={handleConfirm} loading={isLoading}>
            Yes, {action} all
          </Button>
          <Button variant="secondary" onClick={close}>
            Cancel
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default BulkStatusDialog;
