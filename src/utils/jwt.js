import { jwtDecode } from "jwt-decode";

export const authUser = () => {
  const token = localStorage.getItem("access_token");
  if (token) {
    return jwtDecode(token)?.data;
  }
  return null;
};
