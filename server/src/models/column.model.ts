import { prisma } from './';

type TColumnInput = {
  title: string;
  colNum: number;
  boardId: string;
};

const columnModel = {
  getAll: async (usedId: string) => {
    try {
      const columns = await prisma.column.findMany({
        where: {
          Board: {
            userId: usedId,
          },
        },
      });
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
  addToColumn: async (jobId: string, columnId: string) => {
    try {
      const colBeforeUpdate = await prisma.column.findUnique({
        where: {
          id: columnId,
        },
      });
      const column = await prisma.column.update({
        where: {
          id: columnId,
        },
        data: {
          orderOfIds: {
            set: [jobId, ...(colBeforeUpdate?.orderOfIds ?? [])],
          },
        },
      });
      return column;
    } catch (err) {
      console.log('err addToColumn:>> ', err);
    }
  },
  removeFromColumn: async (jobId: string, columnId: string) => {
    try {
      const column = await prisma.column.findUnique({
        where: { id: columnId },
      });
      if (column) {
        const updatedColumn = await prisma.column.update({
          where: {
            id: columnId,
          },
          data: {
            orderOfIds: column.orderOfIds.filter((id: string) => id !== jobId),
          },
          include: {
            jobs: true,
          },
        });
        return updatedColumn;
      }
    } catch (err) {
      console.log('err addToColumn:>> ', err);
    }
  },
  updateIds: async (columnId: string, orderOfIds: string[]) => {
    try {
      const updateJob = await prisma.column.update({
        where: {
          id: columnId,
        },
        data: {
          orderOfIds,
        },
        include: {
          jobs: true,
        },
      });
      return updateJob;
    } catch (err) {
      console.log('err addToColumn:>> ', err);
    }
  },
};

export default columnModel;
