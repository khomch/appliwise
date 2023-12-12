import { BASE_URL, fetchJobs } from '@/services/api';
import { TJob, TJobs } from '@/types/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getJobData = createAsyncThunk('job/getJobData', async () =>
  fetchJobs().catch((e) => console.error('Error in fetching data:', e))
);

type TJobsStateType = {
  jobs: TJobs;
  loading: boolean;
  newJob: TJob;
};

export const initialState: TJobsStateType = {
  jobs: {},
  loading: false,
  newJob: {
    id: '',
    columnId: '',
    createdAt: '',
    updatedAt: '',
    url: '',
    img: '',
    position: '',
    company: '',
    prevId: null,
    nextId: null,
  },
};

export const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    addNewJob: (state, { payload }) => {
      const job = payload;
      state.jobs = { ...state.jobs, [job.id]: payload };
    },
    setFavourite: (state, { payload }) => {
      const { id, newState } = payload;
      state.jobs = { ...state.jobs, [id]: newState };
    },
    deleteJobFromState: (state, { payload }) => {
      const id = payload;
      state.jobs = { ...state.jobs, [id]: null };
      delete state.jobs[id];
    },
    updateJobState: (state, { payload }) => {
      const { jobId, key, value } = payload;
      state.jobs = {
        ...state.jobs,
        [jobId]: { ...state.jobs[jobId], [key]: value },
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getJobData.pending, (state: any) => {
        state.loading = true;
      })
      .addCase(getJobData.fulfilled, (state, { payload }) => {
        const jobsArr = payload.slice();
        const jobs: TJobs = {};
        jobsArr.forEach((el: TJob) => {
          jobs[el.id] = el;
        });
        state.jobs = jobs;
      })
      .addCase(getJobData.rejected, (state: any) => {
        state.loading = false;
      });
  },
});

export const { addNewJob, setFavourite, deleteJobFromState, updateJobState } =
  jobSlice.actions;

export default jobSlice.reducer;
