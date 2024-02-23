import { createSlice } from '@reduxjs/toolkit';
/* eslint-disable no-param-reassign */
export const studentListSlice = createSlice({
  name: 'studentList',
  initialState: { students: [] },
  reducers: {
    register: (state, action) => {
      const { grade, name, phoneNumber } = action.payload;
      state.students.push({
        grade,
        name,
        phoneNumber,
      });
    },
    remove: (state, action) => {
      const { index } = action.payload;
      state.students.splice(index, 1);
    },
    removeMultiple: (state, action) => {
      const { removedArr } = action.payload;
      removedArr.sort((a, b) => b - a);
      state.students = state.students.filter(
        (student, index) => !removedArr.includes(index),
      );
    },
    modify: (state, action) => {
      const { index, grade, name, phoneNumber } = action.payload;

      state.students.splice(index, 1, {
        grade,
        name,
        phoneNumber,
      });
    },
  },
});

export const { register, remove, removeMultiple, modify } =
  studentListSlice.actions;

export default studentListSlice.reducer;
