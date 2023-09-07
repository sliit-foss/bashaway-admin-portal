import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./base";

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery,
  endpoints: (builder) => ({
    getRegistrationInfo: builder.query({
      query: () => `/api/dashboard/registrations`
    }),
    getQuestionSubmissions: builder.query({
      query: () => `/api/dashboard/submissions`
    }),
    getTeamSubmissions: builder.query({
      query: () => `/api/dashboard/submissions/team`
    })
  })
});

export const { useGetRegistrationInfoQuery, useGetQuestionSubmissionsQuery, useGetTeamSubmissionsQuery } = dashboardApi;
