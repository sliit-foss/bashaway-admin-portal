import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery, { mutationHelper } from "./base";

const { patch, post } = mutationHelper;

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery,
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: ({ filters = "", sorts = "", page = "" }) => `/api/users?${filters}&${sorts}&page=${page}&limit=10`
    }),
    changePassword: builder.mutation({
      query: (data) => patch(`/api/users/change_password`, data)
    }),
    addUser: builder.mutation({
      query: (data) => post(`/api/users`, data)
    }),
    updateUser: builder.mutation({
      query: ({ id, data }) => patch(`/api/users/${id}`, data)
    })
  })
});

export const { useGetAllUsersQuery, useLazyGetAllUsersQuery, useAddUserMutation, useUpdateUserMutation, useChangePasswordMutation } = userApi;
