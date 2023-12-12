import { Request, Response } from 'express';
import columnModel from '../models/column.model';
import { RequestWithUser } from '../middlewares/auth';

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

  updateIds: async (req: Request, res: Response) => {
    try {
      const data = await columnModel.updateIds(req.body);
      res.status(201);
      res.json(data);
    } catch (err) {
      res.status(500);
      res.send(err);
      throw new Error('Error while posting');
    }
  },
};

export default columnController;
