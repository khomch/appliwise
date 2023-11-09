import { TColumn } from '@/app/dashboard/types';

export const onDragEnd = (
  result: any,
  columns: any,
  handleColumnUpdate: any,
  setColumns: any
) => {
  const { destination, source, draggableId } = result;

  if (!destination) return;

  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  ) {
    return;
  }

  const start: TColumn = columns[source.droppableId];
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

    handleColumnUpdate(newColumn.id, newColumn.orderOfIds);
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
  handleColumnUpdate(newStart.id, newStart.orderOfIds);
  handleColumnUpdate(newFinish.id, newFinish.orderOfIds);

  setColumns(newState);
};
