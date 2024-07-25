import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/authSlice";
import tweetReducer from "../features/tweetSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { tweetApi } from "@/services/tweetAPI";
import { repostApi } from "@/services/repostAPI";
import { followApi } from "@/services/followAPI";
import { replyApi } from "@/services/replyAPI";
import { authApi } from "@/services/authAPI";

export const store = configureStore({
  reducer: {
    [tweetApi.reducerPath]: tweetApi.reducer,
    [replyApi.reducerPath]: replyApi.reducer,
    [repostApi.reducerPath]: repostApi.reducer,
    [followApi.reducerPath]: followApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    tweet: tweetReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      replyApi.middleware,
      repostApi.middleware,
      followApi.middleware,
      tweetApi.middleware
    ),
});

setupListeners(store.dispatch);
