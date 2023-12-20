import { configureStore } from '@reduxjs/toolkit';
import columnReducer from './slices/columnSlice';
import boardReducer from './slices/boardSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    column: columnReducer,
    user: userReducer,
    board: boardReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
