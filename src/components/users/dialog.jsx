import { useSelector } from "react-redux";
import { store } from "@/store";
import { useAddUserMutation } from "@/store/api";
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
import { toggleAddUserDialog } from "@/store/reducers/ui/user";

const close = () => store.dispatch(toggleAddUserDialog(false));

const UserDialog = ({ refresh }) => {
    const open = useSelector((store) => store.ui.user.showAddUserDialog);

    const [addUser, { isLoading }] = useAddUserMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addUser({
            name: e.target.name.value,
            email: e.target.email.value,
        }).unwrap().then(() => {
            toast({ title: `Admin user added successfully` })
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
                        <AlertDialogTitle>Add Admin</AlertDialogTitle>
                    </AlertDialogHeader>
                    <Input placeholder="Name" name="name" required className="sm:h-14" />
                    <Input placeholder="Email" name="email" type="email" required className="sm:h-14" />
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
