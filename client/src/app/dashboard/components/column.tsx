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
import { TJob } from '../types';
import Job from './job';
import { useEffect, useState } from 'react';

type ColumnProps = {
  jobsInColumn: TJob[];
  title: string;
  id: string;
};

function Column({ jobsInColumn, title, id }: ColumnProps) {
  const [items, setItems] = useState<TJob[]>([]);
  const [activeItem, setActiveItem] = useState<TJob | null>(null);

  useEffect(() => {
    setItems(jobsInColumn);
  }, [jobsInColumn]);

  return (
    items && (
      <div className="flex flex-col m-w-[312px] px-2 border rounded-lg mx-2 bg-appcolbg h-min my-4 py-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <ul className="flex flex-col">
          <SortableContext
            items={items.map((item) => item.id)}
            strategy={verticalListSortingStrategy}
          >
            {items.map((job: TJob) => (
              <Job key={job.id} job={job} id={job.id} />
            ))}
          </SortableContext>
        </ul>
      </div>
    )
  );
}

export default Column;
