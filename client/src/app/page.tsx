'use client';
import type { DropResult } from '@hello-pangea/dnd';
import { DragDropContext } from '@hello-pangea/dnd';
import { useEffect, useState } from 'react';
import { updateColumn } from '../services/api';
import { getInitialData } from '../utils/getInitialData';
import {
  dndBetweenColumns,
  dndInsideColumn,
  getDropParams,
} from '../utils/handleDnD';
import { TColumns, TJob, TJobs } from '../utils/types';
import Column from './components/column/column';

export default function Home() {
  const [link, setLink] = useState<string>('');
  const [jobs, setJobs] = useState<TJobs>({});
  const [columns, setColumns] = useState<TColumns>({});

  useEffect(() => {
    getInitialData().then(([jobs, cols]) => {
      setJobs(jobs);
      setColumns(cols);
    });
  }, []);

  async function readTextFromClipboard() {
    const text = await navigator.clipboard.readText();
    setLink(text);
  }

  useEffect(() => {
    const handleKeyDown = async (event: any) => {
      const code = event.which || event.keyCode;

      let charCode = String.fromCharCode(code).toLowerCase();
      if ((event.ctrlKey || event.metaKey) && charCode === 'v') {
        await readTextFromClipboard();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleAddNewJob = (newJob: TJob) => {
    const targetColumn = columns[newJob.columnId];
    setColumns((prev) => ({
      ...prev,
      [newJob.columnId]: {
        ...targetColumn,
        orderOfIds: [...targetColumn.orderOfIds, newJob.id],
      },
    }));
    setJobs((prev) => ({ ...prev, [newJob.id]: newJob }));
  };

  useEffect(() => {
    if (link.startsWith('https://www.linkedin.com/jobs/')) {
      fetch('http://localhost:3000/job', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: link }),
      })
        .then((data: any) => data.json())
        .then((res) => handleAddNewJob(res));
    }
  }, [link]);

  const onDragEnd = (result: DropResult) => {
    const dropParams = getDropParams(result);
    if (!Array.isArray(dropParams)) return;
    const [source, destination, draggableId] = dropParams;

    const start = columns[source.droppableId];
    const finish = columns[destination.droppableId];

    if (start === finish) {
      const updatedColumn = dndInsideColumn(
        start,
        source,
        destination,
        draggableId
      );
      updateColumn(updatedColumn.id, updatedColumn.orderOfIds);
      setColumns((prev) => ({ ...prev, [updatedColumn.id]: updatedColumn }));
      return;
    }

    // Moving from one list to another
    const [updatedStart, updatedFinish] = dndBetweenColumns(
      start,
      finish,
      source,
      destination,
      draggableId
    );

    updateColumn(updatedStart.id, updatedStart.orderOfIds);
    updateColumn(updatedFinish.id, updatedFinish.orderOfIds);

    setColumns((prev) => ({
      ...prev,
      [updatedStart.id]: updatedStart,
      [updatedFinish.id]: updatedFinish,
    }));
  };

  return (
    <main className="flex w-full justify-center items-center align-middle">
      <section className="flex min-h-screen justify-between max-w-[1320px] self-center w-full">
        <DragDropContext onDragEnd={onDragEnd}>
          {columns &&
            columns &&
            Object.keys(columns).length > 0 &&
            Object.values(columns).map((column: any) => {
              const columnJobs =
                column!.orderOfIds.map((jobId: any) => jobs![jobId]) || [];
              return (
                <Column
                  key={column.id}
                  id={column.id}
                  jobsInColumn={columnJobs}
                  title={column.title}
                  setJobs={setJobs}
                />
              );
            })}
        </DragDropContext>
      </section>
    </main>
  );
}
