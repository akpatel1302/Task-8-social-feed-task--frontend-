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
    fetchPosts: builder.mutation({
      query: (params) => ({
        url: "/posts/get-feed-posts?",
        method: "GET",
        params,
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useGetUserMutation,
  useCreatePostsMutation,
  useFetchPostsMutation,
} = signupApi;
