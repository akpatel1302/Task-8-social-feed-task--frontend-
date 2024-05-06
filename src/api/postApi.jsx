import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../app/Common-header";
import { current } from "@reduxjs/toolkit";

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
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const { data: createdProject } = await queryFulfilled;
          console.log(createdProject.data);

          dispatch(
            postApi.util.updateQueryData(
              "fetchPosts",
              {
                page: 1,
                perPage: 20,
                search: "",
                isMyPostsOnly: false,
                isPrivate: false,
              },
              (draft) => {
                console.log(current(draft));
                draft?.data?.data?.unshift(createdProject.data);
              }
            )
          );
        } catch (error) {
          console.log(error);
        }
      },
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
