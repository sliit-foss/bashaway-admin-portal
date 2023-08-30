import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery, { mutationHelper } from "./base";

const { patch } = mutationHelper;

export const submissionApi = createApi({
  reducerPath: "submissionApi",
  baseQuery,
  endpoints: (builder) => ({
    getAllSubmissions: builder.query({
      query: ({ filters, sorts, page }) => `/api/submissions?${filters}&${sorts}&page=${page}&limit=10`
    }),
    gradeSubmission: builder.mutation({
      query: ({ id, data }) => patch(`/api/submissions/${id}`, data)
    })
  })
});

export const { useGetAllSubmissionsQuery, useLazyGetAllSubmissionsQuery, useGradeSubmissionMutation } = submissionApi;
