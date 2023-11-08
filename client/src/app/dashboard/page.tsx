'use client';
import { useEffect, useState } from 'react';
import Column from './components/column';
import { TColumn, TJob } from './types';

export default function Dashboard() {
  const [jobs, setJobs] = useState<any>([]);
  const [columns, setColumn] = useState<any>();

  useEffect(() => {
    fetch('http://localhost:3000/job', {
      method: 'GET',
    })
      .then((data: any) => data.json())
      .then((res) => {
        setJobs(res);
        console.log('jobs: ', res);
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/column', {
      method: 'GET',
    })
      .then((data: any) => data.json())
      .then((res) => {
        setColumn(res);
        console.log('columns: ', res);
      });
  }, []);

  return (
    <section className="flex min-h-screen justify-between max-w-7xl self-center w-full">
      {columns &&
        columns.length > 0 &&
        columns.map((column: TColumn) => (
          <Column
            key={column.id}
            jobsInColumn={jobs.filter(
              (job: TJob) => job.columnId === column.id
            )}
            title={column.title}
          />
        ))}
    </section>
  );
}
