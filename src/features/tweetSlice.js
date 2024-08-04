import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tweetBoxType: "tweet",
  homeRoute: "For You",
  isDialogOpen: false,
};

export const tweetSlice = createSlice({
  name: "tweets",
  initialState,
  reducers: {
    setTweetBoxType: (state, { payload }) => {
      state.tweetBoxType = payload;
    },
    setHomeRoute: (state, { payload }) => {
      state.homeRoute = payload;
    },
    setIsDialogOpen: (state, { payload }) => {
      state.isDialogOpen = payload;
    },
  },
});

export const { setTweetBoxType, setHomeRoute, setIsDialogOpen } =
  tweetSlice.actions;

export default tweetSlice.reducer;
