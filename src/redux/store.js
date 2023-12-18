// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import positionSlice from './actions/positionSlice';
const store = configureStore({
  reducer: positionSlice,
});

export default store;
