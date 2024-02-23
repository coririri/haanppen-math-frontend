import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: studentReducer,
});

export default store;
