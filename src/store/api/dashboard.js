import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./base";

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery,
  endpoints: (builder) => ({
    getRegistrationInfo: builder.query({
      query: ({ round, ghostLegion = false }) =>
        `/api/dashboard/registrations?round=${round}&ghost_legion=${ghostLegion}`
    }),
    getQuestionSubmissions: builder.query({
      query: ({ round, ghostLegion = false }) => `/api/dashboard/submissions?round=${round}&ghost_legion=${ghostLegion}`
    }),
    getTeamSubmissions: builder.query({
      query: ({ round, ghostLegion = false }) =>
        `/api/dashboard/submissions/team?round=${round}&ghost_legion=${ghostLegion}`
    })
  })
});

export const { useGetRegistrationInfoQuery, useGetQuestionSubmissionsQuery, useGetTeamSubmissionsQuery } = dashboardApi;
