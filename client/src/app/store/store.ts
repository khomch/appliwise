import { configureStore } from '@reduxjs/toolkit';
import jobsReducer from './slices/jobSlice';
import columnReducer from './slices/columnSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    column: columnReducer,
    job: jobsReducer,
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
