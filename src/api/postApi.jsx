import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./Common-header";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    createPosts: builder.mutation({
      query: (postData) => ({
        url: "/posts/create-post",
        method: "POST",
        body: postData,
      }),
    }),
    fetchPosts: builder.query({
      query: () => ({
        url: "/posts/get-feed-posts?",
        method: "GET",
      }),
    }),
    fetchImage: builder.query({
      query: (postId) => ({
        url: `/posts/get-feed-image?postId=${postId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreatePostsMutation,
  useFetchPostsQuery,
  useFetchImageQuery,
} = postApi;
