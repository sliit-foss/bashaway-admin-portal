import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  competitors: [],
  admins: [],
  currentUser: {}
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = Object.keys(action.payload || {}).reduce((acc, curr) => {
        acc[curr] = action.payload[curr] || state[curr];
        return acc;
      }, {});
    },
    setCompetitors(state, action) {
      state.competitors = action.payload;
    },
    setAdmins(state, action) {
      state.admins = action.payload;
    }
  }
});

export const { setCurrentUser, setCompetitors, setAdmins } = userSlice.actions;

export default userSlice.reducer;
