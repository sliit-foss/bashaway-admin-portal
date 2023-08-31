import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button
} from "@sliit-foss/bashaway-ui/components";

const Terms = ({ open, setOpen, onConfirm }) => {
  return (
    <AlertDialog
      open={open}
      onOpenChange={(open) => {
        if (!open) setOpen(false);
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Participation</AlertDialogTitle>
          <AlertDialogDescription>
            My team and I hereby conform to the rules and regulations of the competition as well as give our consent for
            the software created and uploaded to this website to be made open source and publicly available.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            onClick={() => {
              setOpen(false);
              onConfirm(null, true);
            }}
          >
            Agree & Continue
          </Button>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Decline
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Terms;
