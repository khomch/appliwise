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
};

export default jobModel;
