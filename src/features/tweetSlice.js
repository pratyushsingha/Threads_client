import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 1,
  tweetBoxType: "tweet",
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
  },
});

export const { setPage, setTweetBoxType } = tweetSlice.actions;

export default tweetSlice.reducer;
