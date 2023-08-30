import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery, { mutationHelper } from "./base";
import { createSelector } from "@reduxjs/toolkit";

const { patch, post } = mutationHelper;

export const questionApi = createApi({
  reducerPath: "questionApi",
  baseQuery,
  endpoints: (builder) => ({
    getQuestions: builder.query({
      query: ({ filters, sorts, page }) => `/api/questions?${filters}&${sorts}&page=${page}&limit=6`
    }),
    getQuestionById: builder.query({
      query: (id) => `/api/questions/${id}`
    }),
    addQuestion: builder.mutation({
      query: (data) => post(`/api/questions`, data)
    }),
    updateQuestion: builder.mutation({
      query: ({ id, data }) => patch(`/api/questions/${id}`, data)
    })
  })
});

export const selectQuestionById = (id) => createSelector(
  ({ questionApi }) => questionApi.queries,
  (queries) => Object.values(queries).filter(q => q.endpointName === 'getQuestions')
    ?.sort((a, b) => b?.fulfilledTimeStamp - a.fulfilledTimeStamp)?.[0]
    ?.data?.data?.docs?.filter((q) => q?._id === id)?.[0]);

export const {
  useGetQuestionsQuery,
  useLazyGetQuestionsQuery,
  useGetQuestionByIdQuery,
  useLazyGetQuestionByIdQuery,
  useAddQuestionMutation,
  useUpdateQuestionMutation
} = questionApi;
