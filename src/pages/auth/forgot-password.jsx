import { Link, useNavigate } from "react-router-dom";
import { useTitle } from "@/hooks";
import { useRequestPasswordResetCodeMutation } from "@/store/api";
import { Button, Input, toast } from "@sliit-foss/bashaway-ui/components";
import { Caption, Footnote, Title } from "@sliit-foss/bashaway-ui/typography";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [requestPasswordResetCode, { isLoading }] = useRequestPasswordResetCodeMutation();

  const handleForm = async (e) => {
    e.preventDefault();
    await requestPasswordResetCode({
      email: e.target.email.value
    })
      .unwrap()
      .then(() => {
        navigate("/");
        toast({ title: "An email has been sent with a link to reset your password" });
      });
  };

  useTitle("Reset Password | Bashaway");

  return (
    <div className="w-full min-h-[70vh] flex flex-col justify-center items-center">
      <form className="w-full max-w-form flex flex-col items-center gap-5" onSubmit={handleForm}>
        <div className="flex flex-col items-center gap-3 md:gap-2 mb-6 pointer-events-none">
          <Title>Forgot Password?</Title>
          <Footnote className="lg:text-center">
            No worries, please enter your registration email address. We&apos;ll send you a link to help reset your
            password.
          </Footnote>
        </div>
        <Input placeholder="Email" type="email" name="email" className="p-4" required />
        <Button className="w-full h-14 sm:h-16 text-[20px] mt-6" loading={isLoading}>
          Send
        </Button>
        <span>
          <Caption className="text-black/40 mr-1.5">Remembered your password?</Caption>
          <Link to="/login">
            <Caption className="link">Login</Caption>
          </Link>
        </span>
      </form>
    </div>
  );
};

export default ForgotPassword;
