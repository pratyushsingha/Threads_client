import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tweetApi } from "./tweetAPI";
import { replyApi } from "./replyAPI";

const updateRepostedTweet = (tweets, tweetId) => {
  const tweet = tweets.find((tweet) => tweet._id === tweetId);
  if (tweet) {
    tweet.isReposted = !tweet.isReposted;
  }
};

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
      async onQueryStarted(tweetId, { dispatch, queryFulfilled, getState }) {
        const username = getState().auth.usernameParams;
        const id = getState().auth.idParams;
        const patchUpdate = [
          dispatch(
            tweetApi.util.updateQueryData("getTweetById", id, (tweets) => {
              tweets[0].isReposted = !tweets[0].isReposted;
            })
          ),
          dispatch(
            tweetApi.util.updateQueryData(
              "getFeedTweets",
              undefined,
              (tweets) => updateRepostedTweet(tweets.tweets, tweetId)
            )
          ),
          // TODO: update the getTweetReplies query
          dispatch(
            replyApi.util.updateQueryData("getTweetReplies", id, (draft) => {
              const tweet = draft.replies.find(
                (tweet) => tweet.tweetId === tweetId
              );
              if (tweet) {
                tweet.isReposted = !tweet.isReposted;
              }
            })
          ),
          dispatch(
            tweetApi.util.updateQueryData(
              "getBookmarkedTweets",
              undefined,
              (tweets) => {
                updateRepostedTweet(tweets.tweets, tweetId);
              }
            )
          ),
          dispatch(
            tweetApi.util.updateQueryData("getMyTweets", username, (tweets) => {
              updateRepostedTweet(tweets.tweets, tweetId);
            })
          ),
          dispatch(
            tweetApi.util.updateQueryData(
              "getPublicTweets",
              username,
              (tweets) => {
                updateRepostedTweet(tweets.tweets, tweetId);
              }
            )
          ),
          dispatch(
            tweetApi.util.updateQueryData(
              "getFollowingUserTweets",
              getState().pagination.followingUsersTweetsPage,
              (tweets) => {
                updateRepostedTweet(tweets.followingTweets, tweetId);
              }
            )
          ),
          dispatch(
            replyApi.util.updateQueryData(
              "getRepliedTweets",
              username,
              (repliedTweets) => {
                const tweet = repliedTweets.repliedTweets.find(
                  (repliedTweet) => repliedTweet._id === tweetId
                );
                if (tweet) {
                  tweet.isReposted = !tweet.isReposted;
                } else {
                  const reply = repliedTweets.repliedTweets.find(
                    (reply) => reply.tweetId === tweetId
                  );
                  if (reply) {
                    reply.tweetDetails.isReposted =
                      !reply.tweetDetails.isReposted;
                  }
                }
              }
            )
          ),
        ];
        try {
          await queryFulfilled;
        } catch (error) {
          patchUpdate.forEach((patch) => patch.undo());
        }
      },
      invalidatesTags: ["reposts"],
    }),
    getRepostedTweets: builder.query({
      query: ({ username, page }) =>
        `reposts/tweet/${username}?page=${page}&limit=20`,
      provideTags: ["reposts"],
      serializeQueryArgs: ({ page }) => page,
      merge: (currentCache, newReposts) => {
        currentCache.reposts.push(...newReposts.reposts);
      },
      forceRefetch: ({ currentArgs, newArgs }) => currentArgs !== newArgs,
      transformResponse: (response) => response.data,
    }),
  }),
});

export const { useRepostTweetMutation, useGetRepostedTweetsQuery } = repostApi;
