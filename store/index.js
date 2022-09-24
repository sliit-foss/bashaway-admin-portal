import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./ui";
import userSlice from "./user";

export function makeStore() {
  return configureStore({
    devTools: true,
    reducer: {
      ui: uiSlice,
      user: userSlice,
    },
  });
}

const store = makeStore();

export default store;
