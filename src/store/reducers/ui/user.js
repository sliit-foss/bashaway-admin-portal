import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showAddUserDialog: false
};

export const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleAddUserDialog(state, action) {
      state.showAddUserDialog = action.payload;
    }
  }
});

export const { toggleAddUserDialog } = slice.actions;

export default slice.reducer;
