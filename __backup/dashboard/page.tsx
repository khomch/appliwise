'use client';
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useEffect, useState } from 'react';
import Column from './components/column';
import { TColumn, TJob } from './types';
import Job from './components/job';

export default function Dashboard() {
  const [jobs, setJobs] = useState<any>([]);
  const [items, setItems] = useState<TJob[]>([]);
  const [columns, setColumns] = useState<any>();
  const [columnsWithJobs, setColumnWithJobs] = useState<any>({});
  const [activeItem, setActiveItem] = useState<TJob | null>(null);

  useEffect(() => {
    fetch('http://localhost:3000/job', {
      method: 'GET',
    })
      .then((data: any) => data.json())
      .then((res) => {
        setJobs(res);
        setItems(res);
        console.log('jobs: ', res);
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/column', {
      method: 'GET',
    })
      .then((data: any) => data.json())
      .then((res) => {
        setColumns(res);
        console.log('columns: ', res);
      });
  }, []);

  useEffect(() => {
    const obj: { [key: string]: any[] } = {};
    console.log('columns: ', columns);
    columns &&
      columns.map((col: any) => {
        obj[col.id] = items.filter((item) => item.columnId === col.id);
      });
    setColumnWithJobs(obj);
  }, [columns, items]);

  console.log('columnsWithJobs', columnsWithJobs);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragStart(event: any) {
    const { active } = event;
    const activeJob = items.find((item: TJob) => item.id === active.id);
    setActiveItem(activeJob || null);
  }

  function handleDragOver(event: any) {
    console.log('OVER');
  }

  function handleDragEnd(event: any) {
    const { active, over } = event;
    const itemCol = items.find((item) => item.id === active.id)?.columnId;
    if (over && active.id !== over.id) {
      console.log('GO!');

      setColumnWithJobs((columnsWithJobs: any) => {
        const oldIndex = columnsWithJobs[itemCol!]
          .map(function (x: TJob) {
            return x.id;
          })
          .indexOf(active.id);
        const newIndex = columnsWithJobs[itemCol!]
          .map(function (x: TJob) {
            return x.id;
          })
          .indexOf(over.id);
        return {
          ...columnsWithJobs,
          [itemCol!]: arrayMove(columnsWithJobs[itemCol!], oldIndex, newIndex),
        };
      });
    }

    // if (over && active.id !== over.id) {
    //   setItems((items) => {
    //     const oldIndex = items
    //       .map(function (x) {
    //         return x.id;
    //       })
    //       .indexOf(active.id);
    //     const newIndex = items
    //       .map(function (x) {
    //         return x.id;
    //       })
    //       .indexOf(over.id);
    //     return arrayMove(items, oldIndex, newIndex);
    //   });
    // }
  }

  return (
    <section className="flex min-h-screen justify-between max-w-[1320px] self-center w-full">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
      >
        {columns &&
          columnsWithJobs &&
          columns.length > 0 &&
          columns.map((column: TColumn) => {
            return (
              <Column
                key={column.id}
                id={column.id}
                jobsInColumn={columnsWithJobs[column.id]}
                // jobsInColumn={items.filter(
                //   (job: TJob) => job.columnId === column.id
                // )}
                title={column.title}
              />
            );
          })}
        <DragOverlay>
          {activeItem ? (
            <Job key={activeItem.id} job={activeItem} id={activeItem.id} />
          ) : null}
        </DragOverlay>
      </DndContext>
    </section>
  );
}
