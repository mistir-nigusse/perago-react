import { combineReducers } from '@reduxjs/toolkit';
import positionReducer from './reducer';

const rootReducer = combineReducers({
  positions: positionReducer,
});

export default rootReducer;