import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./Common-header";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    fetchUser: builder.query({
      query: () => ({
        url: "/users/get-user",
        method: "GET",
      }),
    }),
    fetchUserProfile: builder.query({
      query: () => ({
        url: "/users/get-users-profile?",
        method: "GET",
      }),
    }),
    UpdateUserProfile: builder.mutation({
      query: (body) => ({
        url: "/users/update-user",
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const {
  useFetchUserQuery,
  useFetchUserProfileQuery,
  useUpdateUserProfileMutation,
} = userApi;