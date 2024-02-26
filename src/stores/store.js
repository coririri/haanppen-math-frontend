import { configureStore } from '@reduxjs/toolkit';
import studentReducer from './slices/studentListSlice';
import classReducer from './slices/classListSlice';

const store = configureStore({
  reducer: {
    student: studentReducer,
    class: classReducer,
  },
});

export default store;
