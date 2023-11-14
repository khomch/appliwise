'use client';
import { LINKEDIN_JOBS } from '@/utils/constants';
import type { DropResult } from '@hello-pangea/dnd';
import { DragDropContext } from '@hello-pangea/dnd';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { handleLinkedInParsing, updateColumn } from '../services/api';
import {
  dndBetweenColumns,
  dndInsideColumn,
  getDropParams,
} from '../utils/handleDnD';
import Column from './components/column/column';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import {
  getColumnData,
  handleAddNewJobToColumn,
  updateOneColumn,
  updateTwoColumns,
} from './store/slices/columnSlice';
import { addNewJob, getJobData } from './store/slices/jobSlice';

export default function Home() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { jobs } = useAppSelector((state) => state.job);
  const { columns } = useAppSelector((state) => state.column);

  const [link, setLink] = useState<string>('');

  useEffect(() => {
    dispatch(getJobData());
    dispatch(getColumnData());
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
    if (pathname === '/' && link.startsWith(LINKEDIN_JOBS)) {
      handleLinkedInParsing(link).then((res) => {
        console.log('res: ', res);
        dispatch(handleAddNewJobToColumn(res));
        dispatch(addNewJob(res));
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
      dispatch(updateOneColumn(updatedColumn));
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
    dispatch(updateTwoColumns({ updatedStart, updatedFinish }));
  };

  return (
    <main className="flex w-full justify-center items-center align-middle">
      <section className="flex min-h-screen justify-between max-w-[1320px] self-center w-full">
        <DragDropContext onDragEnd={onDragEnd}>
          {columns &&
            columns &&
            jobs &&
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
                  status={column.status}
                />
              );
            })}
        </DragDropContext>
      </section>
    </main>
  );
}
