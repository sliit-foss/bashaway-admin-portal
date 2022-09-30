import { useDispatch } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { login } from "@services/auth";
import { Button, Input } from "@components/common";
import Layout from "@components/layout";
import { setCurrentUser } from "@store/user";

const Login = () => {
  const router = useRouter();

  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login({
      email: e.target.email.value,
      password: e.target.password.value,
    }).then((res) => {
      if (res.success) {
        if (res.data.user.role === "ADMIN") {
          localStorage.setItem("token", res.data.access_token);
          dispatch(setCurrentUser(res.data.user));
          router.push("/");
        } else {
          toast.error("Invalid credentials");
        }
      }
    });
  };

  return (
    <Layout title="Login | Bashaway">
      <div className="w-full min-h-screen flex flex-col justify-center items-center px-6 sm:px-16">
        <div className="w-full flex flex-col md:flex-row justify-center items-center md:items-start lg:items-center pt-14">
          <div className="w-full md:w-1/2 mb-12 md:mb-0 flex justify-center items-center">
            <img src="assets/images/login.svg" className="w-11/12 sm:w-9/12" />
          </div>
          <div className="flex flex-col w-full md:w-1/2 mr-0 md:mr-6">
            <div>
              <form className="flex flex-col items-end" onSubmit={handleLogin}>
                <Input
                  placeholder="Email"
                  type="email"
                  name="email"
                  className="p-4"
                  required
                />
                <Input
                  placeholder="Password"
                  type="password"
                  name="password"
                  className="my-8 p-3"
                  required
                />
                <Link href="/forgot-password">
                  <span className="text-white font-bold text-sm sm:text-base mt-4 cursor-pointer">
                    Forgot Password?
                  </span>
                </Link>
                <Button className="w-[130px] h-11 sm:w-[165px] mt-10">
                  Login
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
