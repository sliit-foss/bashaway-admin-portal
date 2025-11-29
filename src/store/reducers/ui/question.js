import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selected: null,
  showAddQuestionDialog: false,
  bulkStatusDialog: {
    open: false,
    enabled: false
  }
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
    },
    toggleBulkQuestionStatusUpdateDialog(state, action) {
      state.bulkStatusDialog = action.payload;
    }
  }
});

export const { setSelectedQuestion, toggleAddQuestionDialog, toggleBulkQuestionStatusUpdateDialog } = slice.actions;

export default slice.reducer;
