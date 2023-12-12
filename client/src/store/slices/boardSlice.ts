import { fetchBoards } from '@/services/board.service';
import { TBoards } from '@/types/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getBoardData = createAsyncThunk('board/getBoardData', async () =>
  fetchBoards().catch((e) => console.error('Error in fetching data:', e))
);

type TBoardStateType = {
  boards: TBoards[] | null;
  loading: boolean;
};

export const initialState: TBoardStateType = {
  boards: null,
  loading: false,
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBoardData.pending, (state: any) => {
        state.loading = true;
      })
      .addCase(getBoardData.fulfilled, (state, { payload }) => {
        state.boards = payload?.data;
      })
      .addCase(getBoardData.rejected, (state: any) => {
        state.loading = false;
      });
  },
});

export const {} = boardSlice.actions;

export default boardSlice.reducer;
