import { prisma } from './';

const columnModel = {
  getAll: async () => {
    try {
      const columns = await prisma.column.findMany();
      return columns;
    } catch (err) {
      console.log('err getAll:>> ', err);
    }
  },
  create: async (columnInfo: Record<string, string | undefined>) => {
    try {
      const writeJob = await prisma.column.create({
        data: {
          title: columnInfo.title || '',
          colNum: columnInfo.colNum || '',
          status: columnInfo.status || '',
        },
      });
      return writeJob;
    } catch (err) {
      console.log('err postOne:>> ', err);
    }
  },
  updateColumn: async (data: Record<string, string | undefined>) => {
    try {
      const updateItem = await prisma.item.update({
        where: {
          id: data.id,
        },
        data: {
          Column: {
            connect: {
              status: data.status,
            },
          },
        },
      });
      return updateItem;
    } catch (err) {
      console.log('err addToColumn:>> ', err);
    }
  },
  addToColumn: async (data: Record<string, string | undefined>) => {
    try {
      const column = await prisma.column.update({
        where: {
          status: data.status,
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
      const updateItem = await prisma.column.update({
        where: {
          id: data.id,
        },
        data: {
          orderOfIds: data!.orderOfIds,
        },
      });
      return updateItem;
    } catch (err) {
      console.log('err addToColumn:>> ', err);
    }
  },
};

export default columnModel;
