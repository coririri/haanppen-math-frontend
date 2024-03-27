import { createSlice } from '@reduxjs/toolkit';
/* eslint-disable no-param-reassign */
export const teacherListSlice = createSlice({
  name: 'teacherList',
  initialState: {
    teachers: [
      {
        name: '권나희',
        phoneNumber: '010-3433-0652',
      },
      {
        name: '강병인',
        phoneNumber: '010-1433-0652',
      },
    ],
    deletedIndexArr: [false, false],
  },
  reducers: {
    register: (state, action) => {
      const { name, phoneNumber } = action.payload;
      state.teachers.push({
        name,
        phoneNumber,
      });
      state.deletedIndexArr.push(false);
    },
    remove: (state, action) => {
      const { index } = action.payload;
      state.teachers.splice(index, 1);
      state.deletedIndexArr.splice(index, 1);
    },
    removeMultiple: (state, action) => {
      const { removedArr } = action.payload;
      removedArr.sort((a, b) => b - a);
      state.teachers = state.teachers.filter(
        (teacher, index) => !removedArr.includes(index),
      );
      state.deletedIndexArr = state.classes.filter(
        (value, index) => !removedArr.includes(index),
      );
    },
    modify: (state, action) => {
      const { index, grade, name, phoneNumber } = action.payload;

      state.teachers.splice(index, 1, {
        grade,
        name,
        phoneNumber,
      });
    },
    checkDeletedTeacherIndex: (state, action) => {
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
  checkDeletedTeacherIndex,
} = teacherListSlice.actions;

export default teacherListSlice.reducer;
