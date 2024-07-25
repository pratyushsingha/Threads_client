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
      query: (username, page = 1) =>
        `tweet/reply/u/${username}?page=${page}&limit=20`,
      transformResponse: (response) => response.data.repliedTweets,
    }),
    replyOnTweet: builder.mutation({
      query: ({ data, tweetId }) => {
        const formData = new FormData();
        formData.append("content", data.content);
        formData.append("tags", data.tags);
        formData.append("isAnonymous", data.isAnonymous);

        return {
          url: `/tweet/reply/${tweetId}`,
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: formData,
          formData: true,
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
            replyApi.util.updateQueryData("getTweetReplies", id, (draft) => {
              draft.push({
                ...data,
                ownerDetails: getState().auth.user,
                updatedAt: new Date().toISOString(),
                commentCount: 0,
                likeCount: 0,
                isLiked: false,
                _id: Math.random().toString(),
              });
              draft.forEach((reply) => {
                if (reply.tweetId === tweetId) {
                  reply.commentCount += 1;
                }
              });
            })
          ),
          dispatch(
            tweetApi.util.updateQueryData(
              "getFeedTweets",
              undefined,
              (draft) => {
                const tweet = draft.find((tweet) => tweet._id === tweetId);
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
                const tweet = draft.find((tweet) => tweet.tweetId === tweetId);
                if (tweet) {
                  tweet.tweetDetails.commentCount += 1;
                }
              }
            )
          ),
          dispatch(
            tweetApi.util.updateQueryData(
              "getMyTweets",
              username,
              (draft) => {
                const tweet = draft.find((tweet) => tweet._id === tweetId);
                if (tweet) {
                  tweet.commentCount += 1;
                }
              }
            )
          ),
          dispatch(
            tweetApi.util.updateQueryData(
              "getPublicTweets",
              username,
              (draft) => {
                const tweet = draft.find((tweet) => tweet._id === tweetId);
                if (tweet) {
                  tweet.commentCount += 1;
                }
              }
            )
          ),
        ];
        try {
          await queryFulfilled;
        } catch (error) {
          console.error("Error in query:", error);
          patchUpdate.forEach((update) => update.undo());
        }
      },
    }),
    getTweetReplies: builder.query({
      query: (tweetId, page = 1) =>
        `/tweet/reply/${tweetId}?page=${page}&limit=50`,
      // providesTags: ["tweetReplies"],
      transformResponse: (response) => response.data.replies,
    }),
  }),
});

export const {
  useGetRepliedTweetsQuery,
  useGetTweetRepliesQuery,
  useReplyOnTweetMutation,
} = replyApi;
