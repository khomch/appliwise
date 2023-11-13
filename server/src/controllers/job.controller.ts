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

  getOneJob: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const oneJob = await jobModel.getOne(id);
      res.status(200);
      res.json(oneJob);
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
      const result = await jobModel.createOne({
        ...jobInfo,
        status: req.body.status,
      });
      res.json(result);
    } catch (err) {
      res.status(500);
      res.send(err);
      throw new Error('Error while posting');
    }
  },

  handleFavs: async (req: Request, res: Response) => {
    try {
      res.status(200);
      const result = await jobModel.toggleFav(req.body.id);
      res.json(result);
    } catch (err) {
      res.status(500);
      res.send(err);
      throw new Error('Error while posting');
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      res.status(200);
      const deletedJob = await jobModel.delete(req.body.id);
      res.json(deletedJob);
    } catch (err) {
      res.status(500);
      res.send(err);
      throw new Error('Error while deleteJob');
    }
  },
};

export default jobController;
