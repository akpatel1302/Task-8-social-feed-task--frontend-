import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../app/Common-header";

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
      onQueryStarted: async (
        { id, ...patch },
        { dispatch, queryFulfilled }
      ) => {
        try {
          const { data: updatedUser } = await queryFulfilled;
          dispatch(
            userApi.util.updateQueryData("fetchUser", undefined, (draft) => {
              Object.assign(draft, updatedUser);
            })
          );
        } catch (error) {
          console.error("Error updating user profile cache:", error);
        }
      },
    }),
  }),
});

export const {
  useFetchUserQuery,
  useFetchUserProfileQuery,
  useUpdateUserProfileMutation,
} = userApi;
