import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { Button, Input } from "@components/common";
import Layout from "@components/layout";
import { resetPassword } from "@services/auth";

const ResetPassword = () => {
  const router = useRouter();
  const { code } = router.query;

  const handleReset = async (e) => {
    e.preventDefault();
    await resetPassword(code, {
      new_password: e.target.password.value,
    }).then((res) => {
      if (res.success) {
        toast.success("Password reset successfully!", {
          autoClose: 3500,
        });
        setTimeout(() => {
          router.push("/login");
        }, 3500);
      }
    });
  };

  return (
    <Layout title="Reset Password | Bashaway">
      <div className="w-full min-h-screen flex flex-col justify-center items-center px-6 sm:px-16">
        <div className="w-full flex flex-col md:flex-row justify-center items-center md:items-start lg:items-center pt-14">
          <div className="w-full md:w-1/2 mb-12 md:mb-0 flex justify-center items-center">
            <img src="../assets/images/resetPassword.svg" className="w-9/12" />
          </div>
          <div className="flex flex-col w-full md:w-1/2 mr-0 md:mr-6">
            <span className="text-left text-gray-light text-3xl md:text-4xl">
              Reset Your Password
            </span>
            <form className="flex flex-col items-end" onSubmit={handleReset}>
              <Input
                placeholder="New Password"
                type="password"
                name="password"
                className="my-8 p-4"
                required
              />
              <Button className="h-11 w-[165px] mt-6">Reset Password</Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ResetPassword;
