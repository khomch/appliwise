import { TColumn, TColumns, TJob } from '@/types/types';
import { DraggableLocation, DropResult } from '@hello-pangea/dnd';

export const getDropParams = (
  result: DropResult
): [DraggableLocation, DraggableLocation, string] | undefined => {
  if (!result.destination) {
    return;
  }

  const source = result.source;
  const destination = result.destination;
  const draggableId: string = result.draggableId;

  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  ) {
    return;
  }

  return [source, destination, draggableId];
};

export const dndInsideColumn = (
  start: TColumn,
  source: DraggableLocation,
  destination: DraggableLocation,
  draggableId: string
): TColumn => {
  const newJobIds = Array.from(start.orderOfIds);
  newJobIds.splice(source.index, 1);
  newJobIds.splice(destination.index, 0, draggableId);

  const updatedColumn = {
    ...start,
    orderOfIds: newJobIds,
  };

  return updatedColumn;
};

export const dndBetweenColumns = (
  start: TColumn,
  finish: TColumn,
  source: DraggableLocation,
  destination: DraggableLocation,
  draggableId: string
): [TColumn, TColumn] => {
  const startJobIds = Array.from(start.orderOfIds);
  startJobIds.splice(source.index, 1);
  const jobToAdd: TJob = start.jobs.find((job) => job.id === draggableId)!;
  const updatedStart: TColumn = {
    ...start,
    jobs: start.jobs.filter((job) => job.id !== draggableId) as TJob[],
    orderOfIds: startJobIds,
  };
  const finishJobIds = Array.from(finish.orderOfIds);
  finishJobIds.splice(destination.index, 0, draggableId);
  const updatedFinish: TColumn = {
    ...finish,
    orderOfIds: finishJobIds,
    jobs: [...finish.jobs, jobToAdd],
    jobsObj: { ...finish.jobsObj, [jobToAdd.id]: jobToAdd },
  };
  return [updatedStart, updatedFinish];
};
