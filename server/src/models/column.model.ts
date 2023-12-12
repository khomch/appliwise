import { prisma } from './';

type TColumnInput = {
  title: string;
  colNum: string;
  boardId: string;
};

const columnModel = {
  getAll: async () => {
    try {
      const columns = await prisma.column.findMany();
      return columns;
    } catch (err) {
      console.log('err getAll:>> ', err);
    }
  },
  create: async (columnInfo: TColumnInput) => {
    try {
      const createColumn = await prisma.column.create({
        data: {
          title: columnInfo.title,
          colNum: columnInfo.colNum,
          boardId: columnInfo.boardId,
        },
      });
      return createColumn;
    } catch (err) {
      console.log('err postOne:>> ', err);
    }
  },
  updateColumn: async (data: Record<string, string | undefined>) => {
    try {
      const updateJob = await prisma.job.update({
        where: {
          id: data.id,
        },
        data: {
          Column: {
            connect: {
              id: data.id,
            },
          },
        },
      });
      return updateJob;
    } catch (err) {
      console.log('err addToColumn:>> ', err);
    }
  },
  addToColumn: async (data: Record<string, string | undefined>) => {
    try {
      const column = await prisma.column.update({
        where: {
          id: data.columnId,
        },
        data: {
          orderOfIds: {
            push: data.jobId,
          },
        },
      });
      return column;
    } catch (err) {
      console.log('err addToColumn:>> ', err);
    }
  },
  updateIds: async (data: any) => {
    try {
      const updateJob = await prisma.column.update({
        where: {
          id: data.id,
        },
        data: {
          orderOfIds: data!.orderOfIds,
        },
      });
      return updateJob;
    } catch (err) {
      console.log('err addToColumn:>> ', err);
    }
  },
};

export default columnModel;
