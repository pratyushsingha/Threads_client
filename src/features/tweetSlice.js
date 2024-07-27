import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 1,
  tweetBoxType: "tweet",
  homeRoute: "For You",
};

export const tweetSlice = createSlice({
  name: "tweets",
  initialState,
  reducers: {
    setPage: (state) => {
      state.page += 1;
    },
    setTweetBoxType: (state, { payload }) => {
      state.tweetBoxType = payload;
    },
    setHomeRoute: (state, { payload }) => {
      state.homeRoute = payload;
    },
  },
});

export const { setPage, setTweetBoxType, setHomeRoute } = tweetSlice.actions;

export default tweetSlice.reducer;
