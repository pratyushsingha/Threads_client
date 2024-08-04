import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tweetApi } from "./tweetAPI";
import { repostApi } from "./repostAPI";

export const replyApi = createApi({
  reducerPath: "replyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    credentials: "include",
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getRepliedTweets: builder.query({
      query: ({ username, page }) =>
        `tweet/reply/u/${username}?page=${page}&limit=20`,
      serializeQueryArgs: ({ page }) => page,
      merge: (currentCache, newReplies) => {
        currentCache.push(...newReplies.repliedTweets);
      },
      forceRefetch: ({ currentArg, previousArg }) => currentArg !== previousArg,
      transformResponse: (response) => response.data,
    }),
    replyOnTweet: builder.mutation({
      query: ({ data, tweetId }) => {
        const formData = new FormData();
        formData.append("content", data.content);
        formData.append("tags", data.tags);
        formData.append("isAnonymous", data.isAnonymous);
        data.images.forEach((image) => {
          formData.append("images", image.file);
        });

        return {
          url: `/tweet/reply/${tweetId}`,
          method: "POST",
          body: formData,
        };
      },
      async onQueryStarted(
        { data, tweetId },
        { dispatch, queryFulfilled, getState }
      ) {
        const username = getState().auth.usernameParams;
        const id = getState().auth.idParams;
        const patchUpdate = [
          dispatch(
            tweetApi.util.updateQueryData("getTweetById", tweetId, (draft) => {
              draft[0].commentCount += 1;
            })
          ),
          dispatch(
            replyApi.util.updateQueryData(
              "getRepliedTweets",
              username,
              (draft) => {
                const tweet = draft.repliedTweets.find(
                  (tweet) => tweet._id === tweetId
                );
                if (tweet) {
                  tweet.commentCount += 1;
                } else {
                  const reply = draft.repliedTweets.find(
                    (reply) => reply.tweetId === tweetId
                  );
                  if (reply) {
                    reply.tweetDetails.commentCount += 1;
                  }
                }
              }
            )
          ),
          dispatch(
            tweetApi.util.updateQueryData(
              "getFeedTweets",
              undefined,
              (draft) => {
                const tweet = draft.tweets.find(
                  (tweet) => tweet._id === tweetId
                );
                if (tweet) {
                  tweet.commentCount += 1;
                }
              }
            )
          ),
          dispatch(
            repostApi.util.updateQueryData(
              "getRepostedTweets",
              username,
              (draft) => {
                const tweet = draft.reposts.find(
                  (tweet) => tweet.tweetId === tweetId
                );
                if (tweet) {
                  tweet.tweetDetails.commentCount += 1;
                }
              }
            )
          ),
          dispatch(
            tweetApi.util.updateQueryData("getMyTweets", username, (draft) => {
              const tweet = draft.tweets.find((tweet) => tweet._id === tweetId);
              if (tweet) {
                tweet.commentCount += 1;
              }
            })
          ),
          dispatch(
            tweetApi.util.updateQueryData(
              "getPublicTweets",
              username,
              (draft) => {
                const tweet = draft.tweets.find(
                  (tweet) => tweet._id === tweetId
                );
                if (tweet) {
                  tweet.commentCount += 1;
                }
              }
            )
          ),
        ];
        try {
          const newReply = await queryFulfilled;
          dispatch(
            replyApi.util.updateQueryData("getTweetReplies", id, (draft) => {
              if (id === tweetId) {
                draft.replies.unshift({
                  ...newReply.data.data,
                  ownerDetails: getState().auth.user,
                  commentCount: 0,
                  likeCount: 0,
                  isLiked: false,
                });
              }
              const tweet = draft.replies.find(
                (tweet) => tweet._id === tweetId
              );
              if (tweet) {
                tweet.commentCount += 1;
              }
            })
          );
        } catch (error) {
          console.error("Error in query:", error);
          patchUpdate.forEach((update) => update.undo());
        }
      },
    }),
    getTweetReplies: builder.query({
      query: (tweetId, page) => `/tweet/reply/${tweetId}?page=${page}&limit=50`,

      transformResponse: (response) => response.data,
    }),
  }),
});

export const {
  useGetRepliedTweetsQuery,
  useGetTweetRepliesQuery,
  useReplyOnTweetMutation,
} = replyApi;
