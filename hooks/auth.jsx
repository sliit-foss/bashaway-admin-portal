import { useEffect } from "react";
import { useRouter } from "next/router";
import decode from "jwt-decode";

const blacklistedPaths = [
  "",
  "questions",
  "profiles",
  "users",
  "change-password",
  "leaderboard",
];

const useAuth = () => {
  const router = useRouter();
  useEffect(() => {
    if (
      (!localStorage.getItem("token") || (localStorage.getItem("token") && decode(localStorage.getItem("token")))?.data?.role === 'GROUP') &&
      blacklistedPaths.includes(window.location.pathname.split("/")[1])
    ) {
      localStorage.clear();
      router.push("/login");
    }
  }, [router.pathname]);
};

export default useAuth;
