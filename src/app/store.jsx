import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { authApi } from "../api/authApi";
import { userApi } from "../api/userApi";
import { postApi } from "../api/postApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      userApi.middleware,
      postApi.middleware
    ),
});

setupListeners(store.dispatch);

export default store;
