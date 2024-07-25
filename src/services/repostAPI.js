import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const repostApi = createApi({
  reducerPath: "repostApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    credentials: "include",
    prepareHeaders: (headers, _) => {
      return headers;
    },
  }),
  tagTypes: ["reposts"],
  endpoints: (builder) => ({
    repostTweet: builder.mutation({
      query: (tweetId) => ({
        url: `/reposts/tweet/${tweetId}`,
        method: "POST",
        body: {},
      }),
      invalidatesTags: ["reposts"],
    }),
    getRepostedTweets: builder.query({
      query: (username, page = 1) =>
        `reposts/tweet/${username}?page=${page}&limit=20`,
      provideTags: ["reposts"],
      transformResponse: (response) => response.data.reposts,
    }),
  }),
});

export const { useRepostTweetMutation, useGetRepostedTweetsQuery } = repostApi;
