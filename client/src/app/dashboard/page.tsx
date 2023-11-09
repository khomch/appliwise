'use client';
import { DragDropContext } from '@hello-pangea/dnd';
import { useEffect, useState } from 'react';
import Column from './components/column';
import { TColumn, TJob } from './types';

export default function Dashboard() {
  const [items, setItems] = useState<TJob[]>([]);
  const [columns, setColumns] = useState<any>([]);
  const [columnsWithJobs, setColumnsWithJobs] = useState<any>();

  const getData = async () => {
    const columnsRes = await fetch('http://localhost:3000/column', {
      method: 'GET',
    });
    const jobsRes = await fetch('http://localhost:3000/job', {
      method: 'GET',
    });
    const columns = await columnsRes.json();
    const jobs = await jobsRes.json();

    setItems(jobs);
    setColumns(columns);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const obj: { [key: string]: any[] } = {};
    columns.map((col: any) => {
      obj[col.id] = items.filter((item) => item.columnId === col.id);
    });
    setColumnsWithJobs(obj);
  }, [items]);

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = columnsWithJobs[source.droppableId];
    const finish = columnsWithJobs[destination.droppableId];

    if (start === finish) {
      const itemToInsert = start.find((item: TJob) => item.id === draggableId);
      const newColumn = start.slice();
      newColumn.splice(source.index, 1);
      newColumn.splice(destination.index, 0, itemToInsert);
      const newColumnState = {
        ...columnsWithJobs,
        [source.droppableId]: newColumn,
      };
      setColumnsWithJobs(newColumnState);
      return;
    }

    // Moving from one list to another
    const startColumn = start.slice();
    startColumn.splice(source.index, 1);

    console.log(columnsWithJobs);

    console.log('source: ', source);
    const finishColumn = finish.slice();
    const itemToInsert = columnsWithJobs[source.droppableId].find(
      (item: TJob) => item.id === draggableId
    );
    finishColumn.splice(destination.index, 0, itemToInsert);
    const newColumnsState = {
      ...columnsWithJobs,
      [source.droppableId]: startColumn,
      [destination.droppableId]: finishColumn,
    };

    setColumnsWithJobs(newColumnsState);
  };

  return (
    <section className="flex min-h-screen justify-between max-w-[1320px] self-center w-full">
      <DragDropContext onDragEnd={onDragEnd}>
        {columns &&
          columnsWithJobs &&
          columns.map((column: TColumn) => {
            return (
              <Column
                key={column.id}
                id={column.id}
                jobsInColumn={columnsWithJobs[column.id]}
                title={column.title}
              />
            );
          })}
      </DragDropContext>
    </section>
  );
}
