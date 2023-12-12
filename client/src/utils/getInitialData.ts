import { fetchColumns, fetchJobs } from '../services/api';
import { TColumn, TColumns, TJob, TJobs } from '../types/types';

export const getInitialData = async (): Promise<[TJobs, TColumns]> => {
  const jobsArr = await fetchJobs();
  const columnsArr = await fetchColumns();
  const cols: TColumns = {};
  const jobs: TJobs = {};

  columnsArr
    .sort((a: TColumn, b: TColumn) => {
      return a.index - b.index;
    })
    .forEach((el: TColumn) => {
      cols[el.id] = el;
    });

  jobsArr.forEach((el: TJob) => {
    jobs[el.id] = el;
  });

  return [jobs, cols];
};
