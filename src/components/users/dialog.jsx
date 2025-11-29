import { useState } from "react";
import { useSelector } from "react-redux";
import { userRoleOptions } from "@/filters";
import { store } from "@/store";
import { useAddUserMutation } from "@/store/api";
import { toggleAddUserDialog } from "@/store/reducers/ui/user";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  Dropdown,
  Input,
  toast
} from "@sliit-foss/bashaway-ui/components";

const close = () => store.dispatch(toggleAddUserDialog(false));

const UserDialog = ({ refresh }) => {
  const open = useSelector((store) => store.ui.user.showAddUserDialog);

  const [addUser, { isLoading }] = useAddUserMutation();

  const [role, setRole] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!role) {
      toast({ variant: "destructive", title: "Please select a role" });
      return;
    }
    await addUser({
      name: e.target.name.value,
      email: e.target.email.value,
      role
    })
      .unwrap()
      .then(() => {
        toast({ title: `User added successfully` });
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
            <AlertDialogTitle>Add User</AlertDialogTitle>
          </AlertDialogHeader>
          <Input placeholder="Name" name="name" required className="sm:h-14" />
          <Input placeholder="Email" name="email" type="email" required className="sm:h-14" />
          <Dropdown
            className="sm:h-14"
            label="Select Role"
            name="role"
            options={userRoleOptions.filter((option) => option.key !== "GROUP")}
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
          <AlertDialogFooter className="mt-4">
            <Button type="submit" loading={isLoading}>
              Add
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

export default UserDialog;
