import { Request, Response } from 'express';
import jobModel from '../models/job.model';
import { parseFromUrl } from '../utils/link-parser';
import columnModel from '../models/column.model';

const jobController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const allJobs = await jobModel.getAll();
      res.status(200);
      res.json(allJobs);
    } catch (err) {
      res.status(500);
      res.send(err);
      throw new Error('Error while posting');
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      res.status(201);
      const jobInfo = await parseFromUrl(req.body.url);
      const result = await jobModel.postOne(jobInfo);
      result &&
        (await columnModel.addToColumn({
          status: 'backlog',
          jobId: result.id,
        }));
      res.json(result);
    } catch (err) {
      res.status(500);
      res.send(err);
      throw new Error('Error while posting');
    }
  },
};

export default jobController;
