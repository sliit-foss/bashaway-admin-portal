import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";
import { authUser } from "@/utils";
import { toast } from "@sliit-foss/bashaway-ui";
import { mutationHelper } from "./mutation-helper";

export * from "./mutation-helper";

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASHAWAY_BE_URL,
  prepareHeaders: (headers) => {
    headers.set("authorization", `Bearer ${localStorage.getItem("access_token")}`);
    headers.set("x-origin-application", "admin");
    const user = authUser();
    if (user) {
      headers.set("x-user-email", user.email);
    }
    return headers;
  }
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401 && result.error?.data?.message === "Token expired") {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await baseQuery(
          mutationHelper.post("/api/auth/refresh", {
            refresh_token: localStorage.getItem("refresh_token")
          }),
          api,
          extraOptions
        );
        if (refreshResult.data) {
          localStorage.setItem("access_token", refreshResult.data.data?.access_token);
          result = await baseQuery(args, api, extraOptions);
        } else {
          localStorage.clear();
          window.location.pathname = "/login";
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  if (result.error && result.error.data?.message !== "Unauthorized" && !extraOptions?.silent) {
    toast({
      variant: "destructive",
      title: result.error.data?.message ?? "Just patching things up. This'll be over in a jiffy!"
    });
  }
  return result;
};

export default baseQueryWithReauth;
