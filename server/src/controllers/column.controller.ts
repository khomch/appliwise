import { Request, Response } from 'express';
import columnModel from '../models/column.model';
import { RequestWithUser } from '../middlewares/auth';
import jobModel from '../models/job.model';

const columnController = {
  getColumns: async (req: Request, res: Response) => {
    try {
      const allColumns = await columnModel.getAll();
      res.status(200);
      res.json(allColumns);
    } catch (err) {
      res.status(500);
      res.send(err);
      throw new Error('Error while posting');
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      res.status(201);
      const title = req.body;
      const data = await columnModel.create(title);
      res.json(data);
    } catch (err) {
      res.status(500);
      res.send(err);
      throw new Error('Error while posting');
    }
  },

  addToColumn: async (req: RequestWithUser, res: Response) => {
    try {
      const data = await columnModel.updateColumn(req.body);
      res.status(201);
      res.json(data);
    } catch (err) {
      res.status(500);
      res.send(err);
      throw new Error('Error while posting');
    }
  },

  updateOneColumn: async (req: Request, res: Response) => {
    try {
      const { id, orderOfIds } = req.body;
      const data = await columnModel.updateIds(id, orderOfIds);
      res.status(200);
      res.json(data);
    } catch (err) {
      res.status(500);
      res.send(err);
      throw new Error('Error while updateOneColumn');
    }
  },
  updateTwoColumns: async (req: Request, res: Response) => {
    try {
      type TRequstData = {
        columnFromId: string;
        columnToId: string;
        jobId: string;
        columnToOrderOfIds: string[];
      };
      const requstData: TRequstData = req.body;
      await jobModel.updateJobColumn(requstData.jobId, requstData.columnToId);
      await columnModel.removeFromColumn(
        requstData.jobId,
        requstData.columnFromId
      );
      await columnModel.updateIds(
        requstData.columnToId,
        requstData.columnToOrderOfIds
      );
      res.status(200);
    } catch (err) {
      res.status(500);
      res.send(err);
      throw new Error('Error while updateTwoColumns');
    }
  },
};

export default columnController;
