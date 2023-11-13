import { prisma } from './';
import columnModel from './column.model';
import entryModel from './entry.model';

const jobModel = {
  getAll: async () => {
    try {
      const jobs = await prisma.item.findMany();
      return jobs;
    } catch (err) {
      console.log('err getAll:>> ', err);
    }
  },
  getOne: async (id: string) => {
    try {
      const job = await prisma.item.findFirst({
        where: {
          id: id,
        },
      });
      console.log('job: ', job);
      return job;
    } catch (err) {
      console.log('err getOne:>> ', err);
    }
  },
  delete: async (id: string) => {
    try {
      console.log('id: ', id);

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
            set: column?.orderOfIds.filter((itemId: string) => itemId !== id),
          },
        },
      });
      const deletedJob = await prisma.item.delete({
        where: {
          id: id,
        },
      });
      return deletedJob;
    } catch (err) {
      console.log('err getOne:>> ', err);
    }
  },
  createOne: async (jobInfo: Record<string, string | undefined>) => {
    try {
      const createJob = await prisma.item.create({
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

      entryModel.create({
        title: 'Job added',
        notes: '',
        itemId: createJob.id,
      });

      const updatedColumn = await columnModel.addToColumn({
        jobId: createJob.id,
        status: 'backlog',
      });
      return { ...createJob, columnId: updatedColumn!.id };
    } catch (err) {
      console.log('err postOne:>> ', err);
    }
  },
  toggleFav: async (id: string) => {
    try {
      const job = await prisma.item.findFirst({
        where: {
          id: id,
        },
      });
      if (job) {
        const updatedJob = await prisma.item.update({
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
};

export default jobModel;
