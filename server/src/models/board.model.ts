import { prisma } from '.';
import columnModel from './column.model';

const newColumns = [
  {
    colNum: 0,
    title: 'Backlog',
  },
  {
    colNum: 1,
    title: 'Applied',
  },
  {
    colNum: 2,
    title: 'Interviews',
  },
  {
    colNum: 3,
    title: 'Offer',
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
  getBoards: async (userId: string) => {
    try {
      const boards = await prisma.board.findMany({
        where: {
          userId,
        },
        include: {
          columns: {
            include: {
              jobs: true,
            },
          },
        },
      });
      return boards;
    } catch (err) {
      console.log('err createEntry:>> ', err);
    }
  },
};

export default boardModel;
