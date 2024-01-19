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
      console.log(action.payload)
      state.currentUser = action.payload;
    },
    logout: (state, action) => {
      state.currentUser = null;
    }
  },
});
export const { loginstart, updated,logout } = adminSlice.actions;
export default adminSlice.reducer;
