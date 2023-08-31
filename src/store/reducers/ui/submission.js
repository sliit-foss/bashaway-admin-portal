import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selected: null,
  showGradeSubmissionDialog: false
};

export const slice = createSlice({
  name: "submission",
  initialState,
  reducers: {
    setSelectedSubmission(state, action) {
      state.selected = action.payload;
    },
    toggleGradeSubmissionDialog(state, action) {
      state.showGradeSubmissionDialog = action.payload;
    }
  }
});

export const { setSelectedSubmission, toggleGradeSubmissionDialog } = slice.actions;

export default slice.reducer;
