import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  feedTweetsPage: 1,
  publicTweetsPage: 1,
  myTweetsPage: 1,
  likedTweetsPage: 1,
  repostedTweetsPage: 1,
  repliedTweetsPageNo: 1,
  BookmarkedTweetsPage: 1,
  usersPage: 1,
  tweetRepliesPage: 1,
  allActivitiesPage: 1,
  replyActivitiesPage: 1,
  repostActivitiesPage: 1,
  likeActivitiesPage: 1,
  followActivitiesPage: 1,
  followingUsersTweetsPage: 1,
};

export const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setFeedTweetsPage: (state) => {
      state.feedTweetsPage += 1;
    },
    setPublicTweetsPage: (state) => {
      state.publicTweetsPage += 1;
    },
    setMyTweetsPage: (state) => {
      state.myTweetsPage += 1;
    },
    setLikedTweetsPage: (state) => {
      state.likedTweetsPage += 1;
    },
    setRepostedTweetsPage: (state) => {
      state.repostedTweetsPage += 1;
    },
    setRepliedTweetsPage: (state) => {
      state.repliedTweetsPageNo += 1;
    },
    setBookmarkedTweetsPage: (state) => {
      state.BookmarkedTweetsPage += 1;
    },
    setUsersPage: (state) => {
      state.usersPage += 1;
    },
    setTweetRepliesPage: (state) => {
      state.tweetRepliesPage += 1;
    },
    setAllActivitiesPage: (state) => {
      state.allActivitiesPage += 1;
    },
    setReplyActivitiesPage: (state) => {
      state.replyActivitiesPage += 1;
    },
    setRepostActivitiesPage: (state) => {
      state.repostActivitiesPage += 1;
    },
    setFollowActivitiesPage: (state) => {
      state.followActivitiesPage += 1;
    },
    setLikeActivitiesPage: (state) => {
      state.likeActivitiesPage += 1;
    },
    setFollowingUsersTweetsPage: (state) => {
      state.followingUsersTweetsPage += 1;
    },
  },
});

export const {
  setFeedTweetsPage,
  setPublicTweetsPage,
  setMyTweetsPage,
  setLikedTweetsPage,
  setRepostedTweetsPage,
  setRepliedTweetsPage,
  setBookmarkedTweetsPage,
  setUsersPage,
  setTweetRepliesPage,
  setActivitiesPage,
  setFollowingUsersTweetsPage,
  setAllActivitiesPage,
  setRepostActivitiesPage,

  setLikeActivitiesPage,
  setReplyActivitiesPage,
  setFollowActivitiesPage,
} = paginationSlice.actions;

export default paginationSlice.reducer;
