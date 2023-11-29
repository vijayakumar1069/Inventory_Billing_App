import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    loginstart: (state, action) => {
      state.currentUser = action.payload;
    },
    updated: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});
export const { loginstart, updated } = adminSlice.actions;
export default adminSlice.reducer;
