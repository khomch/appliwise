import { prisma } from './';

const columnModel = {
  getAll: async () => {
    try {
      const columns = await prisma.column.findMany();
      const items = await prisma.item.findMany({
        where: {
          columnId: columns[0].id,
        },
      });
      console.log('items: ', items);
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
              id: data.columnId,
            },
          },
        },
      });
      return updateItem;
    } catch (err) {
      console.log('err addToColumn:>> ', err);
    }
    console.log('err postOne:>> ');
  },
};

export default columnModel;
