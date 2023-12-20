import { prisma } from '.';
import jobModel from './job.model';

const entryModel = {
  create: async (entryInfo: Record<string, string>) => {
    try {
      const newEntry = await prisma.entry.create({
        data: {
          title: entryInfo.title,
          notes: entryInfo.notes,
          jobId: entryInfo.jobId,
          status: entryInfo.status,
        },
      });
      if (newEntry) {
        jobModel.updateLastStatus(entryInfo.jobId, entryInfo.status);
      }
      return newEntry;
    } catch (err) {
      console.log('err createEntry:>> ', err);
    }
  },
  getEntries: async (id: string) => {
    try {
      const entries = await prisma.entry.findMany({
        where: {
          jobId: id,
        },
      });
      return entries;
    } catch (err) {
      console.log('err getAllEntries:>> ', err);
    }
  },
  update: async (entryInfo: Record<string, string>) => {
    try {
      const updatedEntry = await prisma.entry.update({
        where: {
          id: entryInfo.id,
        },
        data: {
          title: entryInfo.title,
          notes: entryInfo.notes,
          jobId: entryInfo.jobId,
          status: entryInfo.status,
        },
      });
      if (updatedEntry) {
        jobModel.updateLastStatus(entryInfo.jobId, entryInfo.status);
      }
      return updatedEntry;
    } catch (err) {
      console.log('err updateEntry:>> ', err);
    }
  },
  delete: async (id: string) => {
    try {
      const deletedEntry = await prisma.entry.delete({
        where: {
          id: id,
        },
      });
      return deletedEntry;
    } catch (err) {
      console.log('err deleteEntry:>> ', err);
    }
  },
};

export default entryModel;
