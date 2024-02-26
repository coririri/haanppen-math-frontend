import { createSlice } from '@reduxjs/toolkit';
/* eslint-disable no-param-reassign */
export const classListSlice = createSlice({
  name: 'classList',
  initialState: {
    classes: [],
    deletedIndexArr: [],
  },
  reducers: {
    register: (state, action) => {
      const { className, num, teacherName } = action.payload;
      state.classes.push({
        className,
        num,
        teacherName,
      });
      state.deletedIndexArr.push(false);
    },
    remove: (state, action) => {
      const { index } = action.payload;
      state.classes.splice(index, 1);
      state.deletedIndexArr.splice(index, 1);
    },
    removeMultiple: (state, action) => {
      const { removedArr } = action.payload;
      removedArr.sort((a, b) => b - a);
      state.classes = state.classes.filter(
        (group, index) => !removedArr.includes(index),
      );
      state.deletedIndexArr = state.classes.filter(
        (value, index) => !removedArr.includes(index),
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
    checkDeletedClassIndex: (state, action) => {
      const index = action.payload;
      state.deletedIndexArr = state.deletedIndexArr.map((item, idx) => {
        if (idx === index) {
          return !item; // 특정 인덱스의 값을 반전시킵니다.
        }
        return item; // 나머지는 그대로 유지합니다.
      });
    },
  },
});

export const {
  register,
  remove,
  removeMultiple,
  modify,
  checkDeletedClassIndex,
} = classListSlice.actions;

export default classListSlice.reducer;
