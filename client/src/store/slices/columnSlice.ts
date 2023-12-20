import { fetchColumns } from '@/services/job.service';
import { TColumn, TColumns, TJob, TJobs } from '@/types/types';
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
          const jobsObject: TJobs = {};
          column.jobs.forEach((job: TJob) => {
            jobsObject[job.id] = job;
          });
          const newColumnData = { ...column, jobsObj: jobsObject };
          colsObj[column.id] = newColumnData;
          
          
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
          orderOfIds: [newJob.id, ...targetColumn.orderOfIds],
          jobs: [...targetColumn.jobs, newJob],
        },
      };
    },
    addNewJob: (state, { payload }) => {
      const job = payload;
      const targetColumn = state.columns[job.columnId];
      state.columns = {
        ...state.columns,
        [job.columnId]: {
          ...targetColumn,
          jobsObj: { ...targetColumn.jobsObj, [job.id]: job },
        },
      };
    },
    setFavourite: (state, { payload }) => {
      const { id, columnId, newState } = payload;
      const targetColumn = state.columns[columnId];
      state.columns = {
        ...state.columns,
        [columnId]: {
          ...targetColumn,
          jobsObj: { ...targetColumn.jobsObj, [id]: newState },
        },
      };
    },
    deleteJobFromState: (state, { payload }) => {
      const { id, columnId } = payload;
      const targetColumn = state.columns[columnId];
      state.columns = {
        ...state.columns,
        [columnId]: {
          ...targetColumn,
          jobsObj: { ...targetColumn.jobsObj, [id]: null },
        },
      };
      delete targetColumn.jobsObj[id];
    },
    updateJobState: (state, { payload }) => {
      const { jobId, columnId, key, value } = payload;
      const targetColumn = state.columns[columnId];
      state.columns = {
        ...state.columns,
        [columnId]: {
          ...targetColumn,
          jobsObj: {
            ...targetColumn.jobsObj,
            [jobId]: { ...targetColumn.jobsObj[jobId], [key]: value },
          },
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
  setFavourite,
  addNewJob,
  deleteJobFromState,
  updateJobState,
} = columnSlice.actions;

export default columnSlice.reducer;
