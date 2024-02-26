import { createSlice } from '@reduxjs/toolkit';
/* eslint-disable no-param-reassign */
export const classListSlice = createSlice({
  name: 'classList',
  initialState: {
    classes: [{ className: '화56', num: 2, teacherName: '권나희 선생님' }],
  },
  reducers: {
    register: (state, action) => {
      const { className, num, teacherName } = action.payload;
      state.classes.push({
        className,
        num,
        teacherName,
      });
    },
    remove: (state, action) => {
      const { index } = action.payload;
      state.classes.splice(index, 1);
    },
    removeMultiple: (state, action) => {
      const { removedArr } = action.payload;
      removedArr.sort((a, b) => b - a);
      state.classes = state.classes.filter(
        (group, index) => !removedArr.includes(index),
      );
    },
    modify: (state, action) => {
      const { index, className, num, teacherName } = action.payload;

      state.classes.splice(index, 1, {
        className,
        num,
        teacherName,
      });
    },
  },
});

export const { register, remove, removeMultiple, modify } =
  classListSlice.actions;

export default classListSlice.reducer;
