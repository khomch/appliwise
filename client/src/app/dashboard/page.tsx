'use client';
import { LINKEDIN_JOBS } from "@/constants";
import type { DropResult } from '@hello-pangea/dnd';
import { DragDropContext } from '@hello-pangea/dnd';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  handleLinkedInParsing,
  sendUpdateTwoColumns,
  updateColumn,
} from '../../services/job.service';
import {
  dndBetweenColumns,
  dndInsideColumn,
  getDropParams,
} from '../../utils/handleDnD';
import Column from '../../components/column/column';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import {
  getColumnData,
  handleAddNewJobToColumn,
  setColumns,
  updateOneColumn,
  updateTwoColumns,
} from '../../store/slices/columnSlice';
import { addNewJob, getJobData, setJobs } from '../../store/slices/jobSlice';
import { getBoardData } from '@/store/slices/boardSlice';
import { TColumn, TJob, TJobs } from '@/types/types';

export default function Dashboard() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { jobs } = useAppSelector((state) => state.job);
  const { columns, defaultColumnId } = useAppSelector((state) => state.column);
  const { boards } = useAppSelector((state) => state.board);

  const [urlToParse, setUrlToParse] = useState<string>('');

  useEffect(() => {
    dispatch(getBoardData());
    boards && dispatch(setColumns(boards[0].columns));
    // dispatch(getJobData());
    // dispatch(getColumnData());
  }, []);

  useEffect(() => {
    boards && dispatch(setColumns(boards[0].columns));
  }, [boards]);

  async function readTextFromClipboard() {
    const text = await navigator.clipboard.readText();
    setUrlToParse(text);
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
    if (pathname === '/dashboard' && urlToParse.startsWith(LINKEDIN_JOBS)) {
      defaultColumnId &&
        handleLinkedInParsing(urlToParse, defaultColumnId).then((res) => {
          console.log('res: ', res);
          dispatch(handleAddNewJobToColumn(res));
          // dispatch(addNewJob(res));
        });
    }
  }, [urlToParse]);

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

    const updateTwoColumnsData = {
      columnFromId: updatedStart.id,
      columnToId: updatedFinish.id,
      jobId: draggableId,
      columnToOrderOfIds: updatedFinish.orderOfIds,
    };
    console.log('updateTwoColumnsData: ', updateTwoColumnsData);
    sendUpdateTwoColumns(updateTwoColumnsData);
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
            Object.values(columns).map((column: TColumn) => {
              const jobsObject: TJobs = {};
              column.jobs &&
                column.jobs.forEach((job: TJob) => {
                  jobsObject[job.id] = job;
                });
              const jobsInUsersOrder = column.orderOfIds.map(
                (jobId: string) => jobsObject[jobId]
              );
              return (
                <Column
                  key={column.id}
                  id={column.id}
                  jobsInColumn={jobsInUsersOrder}
                  title={column.title}
                />
              );
            })}
        </DragDropContext>
      </section>
    </main>
  );
}
