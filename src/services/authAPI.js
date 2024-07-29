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
    getCurrentUser: builder.query({
      query: () => "users/current-user",
      providesTags: ["User"],
      transformResponse: (response) => response.data,
    }),
    userSuggetions: builder.query({
      query: () => "users/suggestions",
      providesTags: ["User"],
      transformResponse: (response) => response.data.users,
    }),
    searchUser: builder.query({
      query: (data) => `/users/search?q=${data}`,
      transformResponse: (response) => response.data,
    }),
  }),
});

export const {
  useLoginMutation,
  useGetCurrentUserQuery,
  useUserSuggetionsQuery,
  useLazySearchUserQuery,
} = authApi;