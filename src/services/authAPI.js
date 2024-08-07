import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    credentials: "include",
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/users/login",
        method: "POST",
        body: data,
        transformResponse: (response) => response.data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/users/logout",
        method: "POST",
        body: {},
        transformResponse: (response) => response.data,
      }),
    }),
    checkAuthStatus: builder.query({
      query: () => "users/auth/status",
      transformResponse: (response) => response.data,
    }),
    getCurrentUser: builder.query({
      query: () => "users/current-user",
      providesTags: ["User"],
      transformResponse: (response) => response.data,
    }),
    userSuggetions: builder.query({
      query: (page) => `users/suggestions?page=${page}&limit=20`,
      providesTags: ["User"],
      serializeQueryArgs: ({ page }) => page,
      merge: (currentCache, newData) => currentCache.users.push(newData.users),
      forceRefetch: ({ currentArg, previousArg }) => currentArg !== previousArg,
      transformResponse: (response) => response.data,
    }),
    searchUser: builder.query({
      query: ({ data, page }) =>
        `users/search?query=${data}&page=${page}&limit=20`,
      serializeQueryArgs: ({ data }) => data,
      transformResponse: (response) => response.data,
    }),
  }),
});

export const {
  useLoginMutation,
  useGetCurrentUserQuery,
  useUserSuggetionsQuery,
  useLazySearchUserQuery,
  useCheckAuthStatusQuery,
  useLazyGetCurrentUserQuery,
  useLazyCheckAuthStatusQuery,
  useLogoutMutation,
} = authApi;
