import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const activityApi = createApi({
  reducerPath: "activityApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/activities`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAllActivities: builder.query({
      query: (page) => `?page=${page}&limit=20`,
      transformResponse: (response) => response.data,
    }),
  }),
});

export const { useGetAllActivitiesQuery } = activityApi;
