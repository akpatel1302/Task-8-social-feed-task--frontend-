// import { createApi } from "@reduxjs/toolkit/query/react";
// import baseQuery from "./Common-header";

// export const signupApi = createApi({
//   reducerPath: "signupApi",
//   baseQuery: baseQuery,
//   endpoints: (builder) => ({
//     signup: builder.mutation({
//       query: (body) => ({
//         url: "/sign-up",
//         method: "POST",
//         body,
//       }),
//     }),
//     getUser: builder.mutation({
//       query: (body) => ({
//         url: "/login",
//         method: "POST",
//         body,
//       }),
//     }),
//     createPosts: builder.mutation({
//       query: (postData) => ({
//         url: "/posts/create-post",
//         method: "POST",
//         body: postData,
//       }),
//     }),
//     fetchPosts: builder.query({
//       query: () => ({
//         url: "/posts/get-feed-posts?",
//         method: "GET",
//         // body: postData,
//       }),
//     }),
//     fetchUser: builder.query({
//       query: () => ({
//         url: "/users/get-user",
//         method: "GET",
//         // body: data,
//       }),
//     }),
//     fetchUserProfile: builder.query({
//       query: () => ({
//         url: "/users/get-users-profile?",
//         method: "GET",
//       }),
//     }),
//     UpdateUserProfile: builder.mutation({
//       query: (body) => ({
//         url: "/users/update-user",
//         method: "PUT",
//         body,
//       }),
//     }),
//   }),
// });

// export const {
//   useSignupMutation,
//   useGetUserMutation,
//   useCreatePostsMutation,
//   useFetchPostsQuery,
//   useFetchUserProfileQuery,
//   useUpdateUserProfileMutation,
//   useFetchUserQuery,
// } = signupApi;
