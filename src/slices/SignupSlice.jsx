// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const signUpApi = createApi({
//   reducerPath: "signUp",
//   baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
//   endpoints: (builder) => ({
//     signUp: builder.mutation({
//       query: (data) => ({
//         url: "/signup",
//         method: "POST",
//         body: data,
//       }),
//     }),
//   }),
// });

// export const { useSignUpMutation } = signUpApi;
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const signUpApi = createApi({
  reducerPath: "signUp",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (data) => ({
        url: "/signup",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSignUpMutation } = signUpApi;

// Override the default behavior of the useSignUpMutation hook
export const useSignUpMutationWithCookie = () => {
  const [mutate] = useSignUpMutation();

  const signUpWithCookie = async (data) => {
    const response = await mutate(data);
    if (response.data && response.data.accessToken) {
      Cookies.set("accessToken", response.data.accessToken, { expires: 7 }); // Save access token in a cookie for 7 days
    }
    return response;
  };

  return [signUpWithCookie];
};
