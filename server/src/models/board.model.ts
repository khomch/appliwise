import { prisma } from '.';
import columnModel from './column.model';

const newColumns = [
  {
    colNum: 'column-1',
    title: 'Backlog',
    status: 'backlog',
  },
  {
    colNum: 'column-2',
    title: 'Applied',
    status: 'applied',
  },
  {
    colNum: 'column-3',
    title: 'Interviews',
    status: 'interviews',
  },
  {
    colNum: 'column-4',
    title: 'Offer',
    status: 'offer',
  },
];

type TBoardInput = {
  title: string;
  userId: string;
};

const boardModel = {
  create: async (boardInfo: TBoardInput) => {
    try {
      const newBoard = await prisma.board.create({
        data: {
          title: boardInfo.title,
          userId: boardInfo.userId,
        },
      });
      if (newBoard) {
        newColumns.forEach((column) =>
          columnModel.create({ ...column, boardId: newBoard.id })
        );
      }
      return newBoard;
    } catch (err) {
      console.log('err createEntry:>> ', err);
    }
  },
};

export default boardModel;
