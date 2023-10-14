import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./base";

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery,
  endpoints: (builder) => ({
    getRegistrationInfo: builder.query({
      query: ({ round, ghost_legion = false }) =>
        `/api/dashboard/registrations?round=${round}&ghost_legion=${ghost_legion}`
    }),
    getQuestionSubmissions: builder.query({
      query: ({ round, ghost_legion = false }) =>
        `/api/dashboard/submissions?round=${round}&ghost_legion=${ghost_legion}`
    }),
    getTeamSubmissions: builder.query({
      query: ({ round, ghost_legion = false }) =>
        `/api/dashboard/submissions/team?round=${round}&ghost_legion=${ghost_legion}`
    })
  })
});

export const { useGetRegistrationInfoQuery, useGetQuestionSubmissionsQuery, useGetTeamSubmissionsQuery } = dashboardApi;
