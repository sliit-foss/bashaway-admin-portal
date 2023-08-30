import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./base";

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery,
  endpoints: (builder) => ({
    getRegistrationInfo: builder.query({
      query: () => `/api//dashboard/registrations`
    }),
    getQuestionSubmissions: builder.query({
      query: () => `/api//dashboard/submissions`
    })
  })
});

export const { useGetRegistrationInfoQuery, useGetQuestionSubmissionsQuery } = dashboardApi;
