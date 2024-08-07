import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  token: null,
  user: null,
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
    setIsAuthenticated: (state, { payload }) => {
      state.isAuthenticated = payload;
    },
  },
});

export const {
  setAuthState,
  setUsernameParams,
  setIdParams,
  setIsAuthenticated,
} = authSlice.actions;

export default authSlice.reducer;
