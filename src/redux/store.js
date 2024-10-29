import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { userSlice } from "./slices/userSlice";
import { courseSlice } from "./slices/courseSlice";

const rootReducer = combineReducers({
  user: userSlice.reducer,
  course: courseSlice.reducer
});

const store = configureStore({
  reducer: rootReducer,
});
export default store;
