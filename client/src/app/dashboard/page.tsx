'use client';
import { DragDropContext } from '@hello-pangea/dnd';
import { useEffect, useState } from 'react';
import Column from './components/column';
import { TColumn, TJob } from './types';
import { fetchColumns, fetchJobs, updateColumn } from '../../../services/api';

export default function Dashboard() {
  const [jobs, setJobs] = useState<TJob[]>();
  const [columns, setColumns] = useState<TColumn[]>([]);

  const getData = async () => {
    const jobsArr = await fetchJobs();
    const columnsArr = await fetchColumns();
    const cols: any = {};
    columnsArr
      .sort((a: any, b: any) => {
        return a.index - b.index;
      })
      .forEach((el: any) => {
        cols[el.id] = el;
      });
    const jobs: any = {};
    jobsArr.forEach((el: any) => {
      jobs[el.id] = el;
    });
    setColumns(cols);
    setJobs(jobs);
  };

  useEffect(() => {
    getData();
  }, []);

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = columns[source.droppableId];
    const finish = columns[destination.droppableId];

    if (start === finish) {
      const newJobIds = Array.from(start.orderOfIds);
      newJobIds.splice(source.index, 1);
      newJobIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        orderOfIds: newJobIds,
      };

      const newState = {
        ...columns,
        [newColumn.id]: newColumn,
      };

      updateColumn(newColumn.id, newColumn.orderOfIds);
      setColumns(newState);
      return;
    }

    // Moving from one list to another
    const startJobIds = Array.from(start.orderOfIds);
    startJobIds.splice(source.index, 1);
    const newStart = {
      ...start,
      orderOfIds: startJobIds,
    };

    const finishJobIds = Array.from(finish.orderOfIds);
    finishJobIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      orderOfIds: finishJobIds,
    };

    const newState = {
      ...columns,
      [newStart.id]: newStart,
      [newFinish.id]: newFinish,
    };
    updateColumn(newStart.id, newStart.orderOfIds);
    updateColumn(newFinish.id, newFinish.orderOfIds);

    setColumns(newState);
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
