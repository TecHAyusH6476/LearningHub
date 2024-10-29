import { createSlice } from "@reduxjs/toolkit";

export const courseSlice = createSlice({
  name: "course",
  initialState: [],
  reducers: {
    addCourse: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addCourse } = courseSlice.actions;
