import { fetchColumns } from '@/services/api';
import { TColumn, TColumns, TJob } from '@/types/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getColumnData = createAsyncThunk(
  'column/getColumnData',
  async () =>
    fetchColumns().catch((e) => console.error('Error in fetching data:', e))
);

type TColumnStateType = {
  columns: TColumns;
  defaultColumnId: string | null;
  loading: boolean;
};

export const initialState: TColumnStateType = {
  columns: {},
  loading: false,
  defaultColumnId: null,
};

export const columnSlice = createSlice({
  name: 'column',
  initialState,
  reducers: {
    setColumns: (state, { payload }) => {
      const columnsArr = payload.slice();
      const colsObj: TColumns = {};
      columnsArr
        .sort((a: TColumn, b: TColumn) => a.colNum - b.colNum)
        .forEach((column: TColumn) => {
          colsObj[column.id] = column;
        });
      state.defaultColumnId = columnsArr[0].id;
      state.columns = colsObj;
    },
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
    handleAddNewJobToColumn: (state, { payload }) => {
      const newJob: TJob = payload;
      const targetColumn = state.columns[newJob.columnId];
      state.columns = {
        ...state.columns,
        [newJob.columnId]: {
          ...targetColumn,
          orderOfIds: [...targetColumn.orderOfIds, newJob.id],
          jobs: [...targetColumn.jobs, newJob],
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
            return a.colNum - b.colNum;
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
  setColumns,
  updateOneColumn,
  updateTwoColumns,
  handleAddNewJobToColumn,
} = columnSlice.actions;

export default columnSlice.reducer;
