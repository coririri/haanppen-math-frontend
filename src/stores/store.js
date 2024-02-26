import { configureStore } from '@reduxjs/toolkit';
import studentReducer from './slices/studentListSlice';
import classReducer from './slices/classListSlice';
import teacherReducer from './slices/teacherListSlice';

const store = configureStore({
  reducer: {
    student: studentReducer,
    class: classReducer,
    teacher: teacherReducer,
  },
});

export default store;
