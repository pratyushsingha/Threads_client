import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
  user: JSON.parse(localStorage.getItem("user")) || null,
  usernameParams: null,
  idParams: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: (state, { payload }) => {
      state.token = payload.token;
      state.user = payload.user;
    },
    setUsernameParams: (state, { payload }) => {
      state.usernameParams = payload;
    },
    setIdParams: (state, { payload }) => {
      state.idParams = payload;
    },
  },
});

export const { setAuthState, setUsernameParams, setIdParams } =
  authSlice.actions;

export default authSlice.reducer;
