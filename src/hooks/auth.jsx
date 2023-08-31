import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { authUser } from "@/utils";

export const whitelistedPaths = ["login", "forgot-password", "reset-password"];

const useAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (
      (!localStorage.getItem("access_token") && !whitelistedPaths.includes(location.pathname.split("/")[1])) ||
      (localStorage.getItem("access_token") && authUser()?.role !== "ADMIN")
    ) {
      navigate("/login");
    } else if (["/login"].includes(location.pathname) && localStorage.getItem("access_token")) {
      navigate("/");
    }
    setCompleted(true);
  }, [location]);

  return completed;
};

export default useAuth;
