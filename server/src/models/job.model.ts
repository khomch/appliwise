import { prisma } from './';
import columnModel from './column.model';

const jobModel = {
  getAll: async () => {
    try {
      const jobs = await prisma.item.findMany();
      return jobs;
    } catch (err) {
      console.log('err getAll:>> ', err);
    }
  },
  postOne: async (jobInfo: Record<string, string | undefined>) => {
    try {
      const writeJob = await prisma.item.create({
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
      const updatedColumn = await columnModel.updateColumn({
        id: writeJob.id,
        status: 'backlog',
      });
      return { ...writeJob, columnId: updatedColumn!.id };
    } catch (err) {
      console.log('err postOne:>> ', err);
    }
  },
  updateJobPosition: async (orderInfo: Record<string, string>) => {
    const updateCurrentJob = await prisma.item.update({
      where: {
        id: orderInfo.currentId,
      },
      data: {
        prevId: orderInfo.prevId,
        nextId: orderInfo.nextId,
        columnId: orderInfo.columnId,
      },
    });
    const updatePrevJob = await prisma.item.update({
      where: {
        id: orderInfo.prevId,
      },
      data: {
        nextId: orderInfo.currentId,
        columnId: orderInfo.columnId,
      },
    });
    const result = await {
      updateCurrent: updateCurrentJob,
      updatePrev: updatePrevJob,
    };
    return result;
  },
};

export default jobModel;
