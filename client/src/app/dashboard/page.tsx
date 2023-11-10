'use client';
import type { DropResult } from '@hello-pangea/dnd';
import { DragDropContext } from '@hello-pangea/dnd';
import { useEffect, useState } from 'react';
import { updateColumn } from '../../../services/api';
import Column from './components/column';
import { getInitialData } from './getInitialData';
import { TColumns, TJobs } from './types';
import { getDropParams, dndInsideColumn, dndBetweenColumns } from './handleDnD';

export default function Dashboard() {
  const [link, setLink] = useState<string>('');
  const [jobs, setJobs] = useState<TJobs>({});
  const [columns, setColumns] = useState<TColumns>({});
  console.log('columns: ', columns);

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

  useEffect(() => {
    if (link.startsWith('https://www.linkedin.com/jobs/')) {
      fetch('http://localhost:3000/job', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: link }),
      })
        .then((data: any) => data.json())
        .then((res) => {
          console.log('res: ', res);
          console.log('res.columnId: ', res.columnId);
          const newColumn = columns[res.columnId];
          // newColumn.orderOfIds.push(res.id);
          // console.log('newColumn: ', newColumn);
          setColumns((prev) => ({
            ...prev,
            [res.columnId]: {
              ...newColumn,
              orderOfIds: [...newColumn.orderOfIds, res.id],
            },
          }));

          setJobs((prev) => ({ ...prev, [res.id]: res }));
        });
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
              />
            );
          })}
      </DragDropContext>
    </section>
  );
}
