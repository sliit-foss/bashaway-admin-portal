import { combineReducers } from "@reduxjs/toolkit";
import global from "./global";
import question from "./question";
import submission from "./submission";
import user from "./user";

export default combineReducers({
  global,
  question,
  submission,
  user
});
