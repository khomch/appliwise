import { configureStore } from '@reduxjs/toolkit';
import jobsReducer from './slices/jobSlice';
import columnReducer from './slices/columnSlice';

export const store = configureStore({
  reducer: {
    column: columnReducer,
    job: jobsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
