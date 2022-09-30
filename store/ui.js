/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showLoader: false,
  backgroundAnimation: process.browser ? 'backgroundAnimation' in window.localStorage ? window.localStorage.getItem('backgroundAnimation') === 'true' : true : true,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleLoader(state, action) {
      state.showLoader = action.payload;
    },
    toggleBackgroundAnimation(state, action) {
      state.backgroundAnimation = action.payload
    },
  },
});

export const { toggleLoader, toggleBackgroundAnimation } = uiSlice.actions;

export default uiSlice.reducer;
