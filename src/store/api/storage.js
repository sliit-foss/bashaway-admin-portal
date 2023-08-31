import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./base";

export const storageApi = createApi({
  reducerPath: "storageApi",
  baseQuery,
  endpoints: (builder) => ({
    signUrl: builder.query({
      query: ({ url, upload = false }) => `/api/storage/sign?url=${encodeURIComponent(url)}&upload=${upload}`
    }),
  })
});

export const { useSignUrlQuery } = storageApi;
