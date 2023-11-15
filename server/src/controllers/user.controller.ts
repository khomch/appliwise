import { Request, Response } from 'express';
import userModel from '../models/user.model';

const userController = {
  create: async (req: Request, res: Response) => {
    try {
      res.status(201);
      const newUser = await userModel.create(req.body);
      res.json(newUser);
    } catch (err) {
      res.status(500);
      res.send(err);
      throw new Error('Error while createUser');
    }
  },
};

export default userController;
