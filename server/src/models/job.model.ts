import { prisma } from './';
import columnModel from './column.model';
import entryModel from './entry.model';

const jobModel = {
  getAll: async () => {
    try {
      const jobs = await prisma.job.findMany();
      return jobs;
    } catch (err) {
      console.log('err getAll:>> ', err);
    }
  },
  getOne: async (id: string) => {
    try {
      const job = await prisma.job.findFirst({
        where: {
          id: id,
        },
      });
      return job;
    } catch (err) {
      console.log('err getOne:>> ', err);
    }
  },
  delete: async (id: string) => {
    try {
      const column = await prisma.column.findFirst({
        where: {
          orderOfIds: {
            has: id,
          },
        },
      });
      await prisma.column.update({
        where: {
          id: column!.id,
        },
        data: {
          orderOfIds: {
            set: column?.orderOfIds.filter((jobId: string) => jobId !== id),
          },
        },
      });
      await prisma.entry.deleteMany({
        where: {
          jobId: id,
        },
      });
      const deletedJob = await prisma.job.delete({
        where: {
          id: id,
        },
      });

      return deletedJob;
    } catch (err) {
      console.log('err getOne:>> ', err);
    }
  },
  createOne: async (jobInfo: Record<string, string>) => {
    try {
      const createJob = await prisma.job.create({
        data: {
          url: jobInfo.url || '',
          img: jobInfo.img,
          position: jobInfo.position,
          company: jobInfo.company,
          location: jobInfo.location,
          description: jobInfo.description,
          salary: jobInfo.salary,
          seniorityLevel: jobInfo.seniority_level,
          jobFunction: jobInfo.job_function,
          employmentType: jobInfo.employment_type,
          industries: jobInfo.industries,
          notes: '',
          columnId: jobInfo.columnId,
          entries: { create: [] },
        },
      });

      entryModel.create({
        title: 'Job added',
        notes: '',
        jobId: createJob.id,
      });

      const updatedColumn = await columnModel.addToColumn(
        createJob.id,
        createJob.columnId
      );
      return { ...createJob, columnId: updatedColumn!.id };
    } catch (err) {
      console.log('err postOne:>> ', err);
    }
  },
  update: async (jobInfo: Record<string, string | undefined>) => {
    try {
      const updatedJob = await prisma.job.update({
        where: {
          id: jobInfo.id,
        },
        data: {
          url: jobInfo.url || '',
          img: jobInfo.img,
          position: jobInfo.position,
          company: jobInfo.company,
          location: jobInfo.location,
          description: jobInfo.description,
          salary: jobInfo.salary,
          seniorityLevel: jobInfo.seniority_level,
          jobFunction: jobInfo.job_function,
          employmentType: jobInfo.employment_type,
          industries: jobInfo.industries,
          notes: '',
          entries: { create: [] },
        },
      });
      return updatedJob;
    } catch (err) {
      console.log('err postOne:>> ', err);
    }
  },
  toggleFav: async (id: string) => {
    try {
      const job = await prisma.job.findFirst({
        where: {
          id: id,
        },
      });
      if (job) {
        const updatedJob = await prisma.job.update({
          where: {
            id: id,
          },
          data: {
            isFavourite: !job?.isFavourite,
          },
        });
        return updatedJob;
      }
      return false;
    } catch (err) {
      console.log('err postOne:>> ', err);
    }
  },
  updateLastStatus: async (id: string, lastStatus: string) => {
    try {
      const job = await prisma.job.findUnique({
        where: {
          id: id,
        },
      });
      if (job) {
        const updatedJob = await prisma.job.update({
          where: {
            id: id,
          },
          data: {
            lastStatus: lastStatus,
          },
        });
        return updatedJob;
      }
      return false;
    } catch (err) {
      console.log('err postOne:>> ', err);
    }
  },
  updateJobColumn: async (id: string, columnId: string) => {
    try {
      const job = await prisma.job.findUnique({
        where: {
          id: id,
        },
      });
      if (job) {
        const updatedJob = await prisma.job.update({
          where: {
            id: id,
          },
          data: {
            columnId: columnId,
          },
        });
        return updatedJob;
      }
      return false;
    } catch (err) {
      console.log('err updateJobColumn:>> ', err);
    }
  },
};

export default jobModel;
