import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const signupApi = createApi({
  reducerPath: "signupApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (body) => ({
        url: "/sign-up",
        method: "POST",
        body,
      }),
    }),
    getUser: builder.mutation({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
    }),
    createPosts: builder.mutation({
      query: ({ postData, accessToken }) => ({
        url: "/posts/create-post",
        method: "POST",
        body: postData,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    }),
    fetchPosts: builder.query({
      query: ({ postData, accessToken }) => ({
        url: "/posts/get-feed-posts?",
        method: "GET",
        body: postData,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    }),
    fetchUser: builder.query({
      query: ({ data, accessToken }) => {
        console.log('from api--->',accessToken);
        return {
          url: "/users/get-user",
          method: "GET",
          body: data,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
    }),
    fetchUserProfile: builder.query({
      query: ({ body, accessToken }) => ({
        url: "/users/get-users-profile?",
        method: "GET",
        body,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    }),
    UpdateUserProfile: builder.mutation({
      query: ({ body, accessToken }) => ({
        url: "/users/update-user",
        method: "PUT",
        body,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useGetUserMutation,
  useCreatePostsMutation,
  useFetchPostsQuery,
  useFetchUserProfileQuery,
  useUpdateUserProfileMutation,
  useFetchUserQuery,
} = signupApi;
