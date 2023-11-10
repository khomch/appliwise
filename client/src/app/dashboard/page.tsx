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
  const [jobs, setJobs] = useState<TJobs>({});
  const [columns, setColumns] = useState<TColumns>({});

  useEffect(() => {
    getInitialData().then(([jobs, cols]) => {
      setJobs(jobs);
      setColumns(cols);
    });
  }, []);

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
