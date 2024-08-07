import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const activityApi = createApi({
  reducerPath: "activityApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/activities`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAllActivities: builder.query({
      query: ({ filter, page }) => `?filter=${filter}&page=${page}&limit=20`,
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return `${endpointName}-${queryArgs.filter}-${queryArgs.page}`;
      },
      merge: (currentCache, newActivities) => {
        return currentCache.activities.push(newActivities.activities);
      },
      forceRefetch: ({ currentArg, previousArg }) => currentArg !== previousArg,
      transformResponse: (response) => response.data,
    }),
  }),
});

export const { useGetAllActivitiesQuery } = activityApi;
