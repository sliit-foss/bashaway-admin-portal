import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selected: null,
  showAddQuestionDialog: false
};

export const slice = createSlice({
  name: "question",
  initialState,
  reducers: {
    setSelectedQuestion(state, action) {
      state.selected = action.payload;
    },
    toggleAddQuestionDialog(state, action) {
      state.showAddQuestionDialog = action.payload;
    }
  }
});

export const { setSelectedQuestion, toggleAddQuestionDialog } = slice.actions;

export default slice.reducer;
