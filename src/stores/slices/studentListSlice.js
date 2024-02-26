import { createSlice } from '@reduxjs/toolkit';
/* eslint-disable no-param-reassign */
export const studentListSlice = createSlice({
  name: 'studentList',
  initialState: { students: [], deletedIndexArr: [] },
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
    checkDeletedStudentIndex: (state, action) => {
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
  checkDeletedStudentIndex,
} = studentListSlice.actions;

export default studentListSlice.reducer;
