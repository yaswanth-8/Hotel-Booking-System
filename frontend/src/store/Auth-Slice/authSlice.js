import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: "no-user",
  },
  reducers: {
    signIn: (state, action) => {
      state.user = action.payload;
    },
    signOut: (state) => {
      state.user = "no-user";
    },
    admin: (state) => {
      state.user = "admin";
    },
  },
});

export const { signIn, signOut, admin } = authSlice.actions;

export default authSlice.reducer;
