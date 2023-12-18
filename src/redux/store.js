// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import positionReducer from './actions/positionSlice';
const store = configureStore({
  reducer: {
    position : positionReducer
  },
});

export default store;
