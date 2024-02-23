import { configureStore } from '@reduxjs/toolkit';
import studentReducer from './slices/studentListSlice';

const store = configureStore({
  reducer: studentReducer,
});

export default store;
