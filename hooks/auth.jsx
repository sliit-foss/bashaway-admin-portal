import { useEffect } from "react";
import { useRouter } from "next/router";

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
      !localStorage.getItem("token") &&
      blacklistedPaths.includes(window.location.pathname.split("/")[1])
    ) {
      router.push("/login");
    }
  }, [router.pathname]);
};

export default useAuth;
