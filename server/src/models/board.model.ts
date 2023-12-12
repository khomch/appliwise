import { prisma } from '.';
import columnModel from './column.model';

const newColumns = [
  {
    colNum: 'column-1',
    title: 'Backlog',
  },
  {
    colNum: 'column-2',
    title: 'Applied',
  },
  {
    colNum: 'column-3',
    title: 'Interviews',
  },
  {
    colNum: 'column-4',
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
        console.log('newBoard: ', newBoard);
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
      if (boards) {
        console.log('boards: ', boards);
      }
      return boards;
    } catch (err) {
      console.log('err createEntry:>> ', err);
    }
  },
};

export default boardModel;
