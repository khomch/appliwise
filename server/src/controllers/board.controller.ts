import { Response } from 'express';
import { RequestWithUser } from '../middlewares/auth';
import boardModel from '../models/board.model';

const boardController = {
  getBoards: async (req: RequestWithUser, res: Response) => {
    try {
      if (req.id) {
        const allBoards = await boardModel.getBoards(req.id);
        res.status(200);
        res.json(allBoards);
      } else {
        res.status(404);
        res.send('Boards not found');
      }
    } catch (err) {
      res.status(500);
      res.send(err);
      throw new Error('Error while posting');
    }
  },
};

export default boardController;
