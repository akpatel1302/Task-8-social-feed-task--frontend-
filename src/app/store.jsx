import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { signupApi } from "../api/SignupApi";

export const store = configureStore({
  reducer: {
    [signupApi.reducerPath]: signupApi.reducer,
    // Add other reducers here if needed
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(signupApi.middleware),
});

setupListeners(store.dispatch);

export default store;
