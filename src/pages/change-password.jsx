import { Link, useNavigate } from "react-router-dom";
import { useTitle } from "@/hooks";
import { useChangePasswordMutation } from "@/store/api";
import { getRegexPatternFromKey } from "@/utils";
import { Button, Input, toast } from "@sliit-foss/bashaway-ui/components";
import { Caption, Footnote, Title } from "@sliit-foss/bashaway-ui/typography";

const ChangePassword = () => {
  const navigate = useNavigate();

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const handleChange = async (e) => {
    e.preventDefault();
    await changePassword({
      old_password: e.target.old_password.value,
      new_password: e.target.new_password.value
    })
      .unwrap()
      .then(() => {
        navigate("/profile");
        toast({ title: "Password changed successfully" });
      });
  };

  useTitle("Change Password | Bashaway");

  return (
    <div className="w-full min-h-[70vh] flex flex-col justify-center items-center mt-4">
      <form className="w-full max-w-form flex flex-col items-center gap-5" onSubmit={handleChange}>
        <div className="flex flex-col items-center gap-3 md:gap-2 mb-6 pointer-events-none">
          <Title>Change Password</Title>
          <Footnote className="lg:text-center">
            Please enter your old and new password. This will invalidate the previous password.
          </Footnote>
        </div>
        <Input placeholder="Old Password" type="password" name="old_password" className="p-4" required />
        <Input
          className="p-4"
          placeholder="New Password"
          type="password"
          name="new_password"
          pattern={getRegexPatternFromKey("password").regex}
          title={getRegexPatternFromKey("password").title}
          required
        />
        <Button className="w-full h-14 sm:h-16 text-[20px] mt-6" loading={isLoading}>
          Change
        </Button>
        <span className="text-center">
          <Caption className="text-black/40 mr-1.5 ">Fine with your old password?</Caption>
          <Link to="/profile">
            <Caption className="link">Back to profile</Caption>
          </Link>
        </span>
      </form>
    </div>
  );
};

export default ChangePassword;
