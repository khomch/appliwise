import { BASE_URL, fetchColumns, fetchJobs } from '@/services/api';
import { TColumn, TColumns, TJob, TJobs } from '@/types/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getColumnData = createAsyncThunk(
  'column/getColumnData',
  async () =>
    fetchColumns().catch((e) => console.error('Error in fetching data:', e))
);

type TColumnStateType = {
  columns: TColumns;
  loading: boolean;
};

export const initialState: TColumnStateType = {
  columns: {},
  loading: false,
};

export const columnSlice = createSlice({
  name: 'column',
  initialState,
  reducers: {
    addColumn: (state, action) => {},
    updateOneColumn: (state, { payload }) => {
      const updatedColumn: TColumn = payload;
      state.columns = { ...state.columns, [updatedColumn.id]: updatedColumn };
    },
    updateTwoColumns: (state, { payload }) => {
      const updatedStart: TColumn = payload.updatedStart;
      const updatedFinish: TColumn = payload.updatedFinish;

      state.columns = {
        ...state.columns,
        [updatedStart.id]: updatedStart,
        [updatedFinish.id]: updatedFinish,
      };
    },
    updateColumnsState: (state, { payload }) => {
      const updatedStart: TColumn = payload.updatedStart;
      const updatedFinish: TColumn = payload.updatedFinish;

      state.columns = {
        ...state.columns,
        [updatedStart.id]: updatedStart,
        [updatedFinish.id]: updatedFinish,
      };
    },
    handleAddNewJobToColumn: (state, { payload }) => {
      const newJob: TJob = payload;
      const targetColumn = state.columns[newJob.columnId];
      state.columns = {
        ...state.columns,
        [newJob.columnId]: {
          ...targetColumn,
          orderOfIds: [...targetColumn.orderOfIds, newJob.id],
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getColumnData.pending, (state: any) => {
        state.loading = true;
      })
      .addCase(getColumnData.fulfilled, (state, { payload }) => {
        const columnsArr = payload.slice();
        const cols: TColumns = {};
        columnsArr
          .sort((a: TColumn, b: TColumn) => {
            return a.index - b.index;
          })
          .forEach((el: TColumn) => {
            cols[el.id] = el;
          });
        state.columns = cols;
      })
      .addCase(getColumnData.rejected, (state: any) => {
        state.loading = false;
      });
  },
});

export const {
  addColumn,
  updateOneColumn,
  updateTwoColumns,
  handleAddNewJobToColumn,
} = columnSlice.actions;

export default columnSlice.reducer;
