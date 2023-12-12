import { TColumn, TColumns } from '@/types/types';
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
  const updatedStart = {
    ...start,
    orderOfIds: startJobIds,
  };

  const finishJobIds = Array.from(finish.orderOfIds);
  finishJobIds.splice(destination.index, 0, draggableId);
  const updatedFinish = {
    ...finish,
    orderOfIds: finishJobIds,
  };
  return [updatedStart, updatedFinish];
};
