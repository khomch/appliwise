import { Request, Response } from 'express';
import entryModel from '../models/entry.model';

const entryController = {
  getEntries: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const allEntries = await entryModel.getEntries(id);
      res.status(200);
      res.json(allEntries);
    } catch (err) {
      res.status(500);
      res.send(err);
      throw new Error('Error while getEntries');
    }
  },
  create: async (req: Request, res: Response) => {
    try {
      res.status(201);
      const newEntry = await entryModel.create(req.body);
      res.json(newEntry);
    } catch (err) {
      res.status(500);
      res.send(err);
      throw new Error('Error while createEntry');
    }
  },
  update: async (req: Request, res: Response) => {
    try {
      res.status(200);
      const updatedEntry = await entryModel.update(req.body);
      res.json(updatedEntry);
    } catch (err) {
      res.status(500);
      res.send(err);
      throw new Error('Error while updateEntry');
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      res.status(204);
      const deletedEntry = await entryModel.delete(req.body.id);
      res.json(deletedEntry);
    } catch (err) {
      res.status(500);
      res.send(err);
      throw new Error('Error while deleteEntry');
    }
  },
};

export default entryController;
