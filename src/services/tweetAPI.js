import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { repostApi } from "./repostAPI";
import { replyApi } from "./replyAPI";

const updateLikedTweet = (tweets, tweetId) => {
  const tweet = tweets.find((tweet) => tweet._id === tweetId);
  if (tweet) {
    tweet.isLiked = !tweet.isLiked;
    if (tweet.isLiked) {
      tweet.likeCount += 1;
    } else {
      tweet.likeCount -= 1;
    }
  }
};

const updateBookmarkedTweet = (tweets, tweetId) => {
  const tweet = tweets.find((tweet) => tweet._id === tweetId);
  if (tweet) {
    tweet.isBookmarked = !tweet.isBookmarked;
  }
};

export const tweetApi = createApi({
  reducerPath: "tweetApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      return headers;
    },
  }),
  tagTypes: [
    "tweets",
    "bookmarks",
    "myTweets",
    "publicTweets",
    "likedTweets",
    "tweetReplies",
  ],
  endpoints: (builder) => ({
    getFeedTweets: builder.query({
      query: (page = 1) => `/tweet?page=${page}&limit=20`,
      providesTags: ["tweets"],
      transformResponse: (response) => response.data.tweets,
    }),
    createTweet: builder.mutation({
      query: (data) => {
        const formData = new FormData();
        formData.append("content", data.content);
        formData.append("tags", data.tags);
        formData.append("isAnonymous", data.isAnonymous);
        // for (let i = 0; i < data.images.length; i++) {
        //   formData.append("images", data.images[i]);
        // }
        return {
          url: "/tweet",
          method: "POST",
          headers: {
            Accept: "application/json",
            // "Content-Type": "multipart/form-data;",
          },
          body: formData,
          formData: true,
        };
      },
      invalidatesTags: ["tweets"],
    }),
    getLikedTweets: builder.query({
      query: (page = 1) => `/like/tweets?page=${page}&limit=20`,
      providesTags: ["likedTweets"],
      transformResponse: (response) => response.data.tweets,
    }),

    getPublicTweets: builder.query({
      query: (username, page = 1) => `/tweet/${username}?page=${page}&limit=20`,
      providesTags: ["publicTweets"],
      transformResponse: (response) => response.data,
    }),
    toggleLike: builder.mutation({
      query: (tweetId) => ({
        url: `/like/tweet/${tweetId}`,
        method: "POST",
        body: {},
      }),
      async onQueryStarted(tweetId, { dispatch, queryFulfilled, getState }) {
        const username = getState().auth.usernameParams;
        const id = getState().auth.idParams;
        
        const tweetUpdate = [
          dispatch(
            tweetApi.util.updateQueryData(
              "getFeedTweets",
              undefined,
              (tweets) => {
                updateLikedTweet(tweets, tweetId);
              }
            )
          ),
          dispatch(
            replyApi.util.updateQueryData("getTweetReplies", id, (draft) => {
              const tweet = draft.find((tweet) => tweet.tweetId === tweetId);
              if (tweet) {
                tweet.isLiked = !tweet.isLiked;
                if (tweet.isLiked) {
                  tweet.likeCount += 1;
                } else {
                  tweet.likeCount -= 1;
                }
              }
            })
          ),
          dispatch(
            tweetApi.util.updateQueryData(
              "getBookmarkedTweets",
              undefined,
              (tweets) => {
                updateLikedTweet(tweets, tweetId);
              }
            )
          ),
          dispatch(
            tweetApi.util.updateQueryData("getMyTweets", username, (tweets) => {
              updateLikedTweet(tweets, tweetId);
            })
          ),
          dispatch(
            tweetApi.util.updateQueryData(
              "getPublicTweets",
              username,
              (tweets) => {
                updateLikedTweet(tweets, tweetId);
              }
            )
          ),
          dispatch(
            tweetApi.util.updateQueryData(
              "getLikedTweets",
              undefined,
              (tweets) => {
                updateLikedTweet(tweets, tweetId);
              }
            )
          ),
          dispatch(
            tweetApi.util.updateQueryData("getTweetById", tweetId, (tweets) => {
              updateLikedTweet(tweets, tweetId);
            })
          ),
          dispatch(
            repostApi.util.updateQueryData(
              "getRepostedTweets",
              username,
              (repostedTweets) => {
                const tweet = repostedTweets.find(
                  (tweet) => tweet.tweetId === tweetId
                );
                if (tweet) {
                  tweet.tweetDetails.isLiked = !tweet.tweetDetails.isLiked;
                  if (tweet.tweetDetails.isLiked) {
                    tweet.tweetDetails.likeCount += 1;
                  } else {
                    tweet.tweetDetails.likeCount -= 1;
                  }
                }
              }
            )
          ),
          dispatch(
            replyApi.util.updateQueryData(
              "getRepliedTweets",
              username,
              (repliedTweets) => {
                const tweet = repliedTweets.find(
                  (repliedTweet) => repliedTweet._id === tweetId
                );
                if (tweet) {
                  tweet.isLiked = !tweet.isLiked;
                  if (tweet.isLiked) {
                    tweet.likeCount += 1;
                  } else {
                    tweet.likeCount -= 1;
                  }
                } else {
                  const reply = repliedTweets.find(
                    (reply) => reply.tweetId === tweetId
                  );
                  if (reply) {
                    reply.tweetDetails.isLiked = !reply.tweetDetails.isLiked;
                    if (reply.tweetDetails.isLiked) {
                      reply.tweetDetails.likeCount += 1;
                    } else {
                      reply.tweetDetails.likeCount -= 1;
                    }
                  }
                }
              }
            )
          ),
          dispatch(
            replyApi.util.updateQueryData("getTweetReplies", id, (draft) => {
              updateLikedTweet(draft, tweetId);
            })
          ),
        ];

        try {
          await queryFulfilled;
        } catch {
          tweetUpdate.forEach((update) => update.undo());
        }

        dispatch(tweetApi.util.invalidateTags(["likedTweets"]));
      },
    }),

    getBookmarkedTweets: builder.query({
      query: (page = 1) => `/bookmarks?page=${page}&limit=20`,
      providesTags: ["bookmarks"],
      transformResponse: (response) => response.data.bookmarkedTweet,
    }),
    toggleBookmark: builder.mutation({
      query: (tweetId) => ({
        url: `/bookmarks/${tweetId}`,
        method: "POST",
        body: {},
      }),
      async onQueryStarted(tweetId, { dispatch, queryFulfilled, getState }) {
        const username = getState().auth.usernameParams;
        const id = getState().auth.idParams;

        const tweetUpdate = [
          dispatch(
            replyApi.util.updateQueryData("getTweetReplies", id, (draft) => {
              const tweet = draft.find((tweet) => tweet._id === tweetId);
              if (tweet) {
                tweet.isBookmarked = !tweet.isBookmarked;
              }
            })
          ),
          dispatch(
            tweetApi.util.updateQueryData(
              "getFeedTweets",
              undefined,
              (tweets) => {
                updateBookmarkedTweet(tweets, tweetId);
              }
            )
          ),
          dispatch(
            tweetApi.util.updateQueryData(
              "getBookmarkedTweets",
              undefined,
              (tweets) => {
                updateBookmarkedTweet(tweets, tweetId);
              }
            )
          ),
          dispatch(
            tweetApi.util.updateQueryData("getMyTweets", username, (tweets) => {
              console.log(tweets);

              updateBookmarkedTweet(tweets, tweetId);
            })
          ),
          dispatch(
            tweetApi.util.updateQueryData(
              "getPublicTweets",
              username,
              (tweets) => {
                updateBookmarkedTweet(tweets, tweetId);
              }
            )
          ),
          dispatch(
            tweetApi.util.updateQueryData(
              "getLikedTweets",
              username,
              (tweets) => {
                updateBookmarkedTweet(tweets, tweetId);
              }
            )
          ),
          dispatch(
            tweetApi.util.updateQueryData("getTweetById", tweetId, (tweets) => {
              updateBookmarkedTweet(tweets, tweetId);
            })
          ),

          dispatch(
            repostApi.util.updateQueryData(
              "getRepostedTweets",
              username,
              (repostedTweets) => {
                const tweet = repostedTweets.find(
                  (tweet) => tweet.tweetId === tweetId
                );
                if (tweet) {
                  tweet.tweetDetails.isBookmarked =
                    !tweet.tweetDetails.isBookmarked;
                }
              }
            )
          ),
          dispatch(
            replyApi.util.updateQueryData(
              "getRepliedTweets",
              username,
              (repliedTweets) => {
                const tweet = repliedTweets.find(
                  (repliedTweet) => repliedTweet._id === tweetId
                );
                if (tweet) {
                  tweet.isBookmarked = !tweet.isBookmarked;
                } else {
                  const reply = repliedTweets.find(
                    (reply) => reply.tweetId === tweetId
                  );
                  if (reply) {
                    reply.tweetDetails.isBookmarked =
                      !reply.tweetDetails.isBookmarked;
                  }
                }
              }
            )
          ),
        ];
        try {
          await queryFulfilled;
        } catch {
          tweetUpdate.forEach((update) => update.undo());
        }
        dispatch(tweetApi.util.invalidateTags(["bookmarks"]));
      },
    }),

    getMyTweets: builder.query({
      query: (username, page = 1) =>
        `/tweet/tweets/${username}?page=${page}&limit=20`,
      providesTags: ["myTweets"],
      transformResponse: (response) => response.data.tweets,
    }),
    getPublicTweets: builder.query({
      query: (username, page = 1) => `/tweet/${username}?page=${page}&limit=20`,
      providesTags: "publicTweets",
      transformResponse: (response) => response.data.tweets,
    }),
    getTweetById: builder.query({
      query: (tweetId) => `/tweet/tweet/${tweetId}`,
      transformResponse: (response) => response.data,
    }),
  }),
});

export const {
  useGetFeedTweetsQuery,
  useGetBookmarkedTweetsQuery,
  useLazyGetMyTweetsQuery,
  useLazyGetPublicTweetsQuery,
  useGetLikedTweetsQuery,
  useGetTweetByIdQuery,
  useCreateTweetMutation,
  useToggleLikeMutation,
  useToggleBookmarkMutation,
} = tweetApi;
