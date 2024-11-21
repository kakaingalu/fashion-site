// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import fetchReducer from './reducer.js';

export const store = configureStore({
  reducer: {
    fetch: fetchReducer,
  },
});