import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { prisma } from '../models';
import { Request, Response } from 'express';
import userModel from '../models/user.model';
import { RequestWithUser } from '../middlewares/auth';

const PRIVATE_KEY = process.env.PRIVATE_KEY || 'test';

const userController = {
  register: async (req: Request, res: Response) => {
    try {
      res.status(201);
      const { email, password, firstName, lastName } = req.body;
      const existingUser = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (existingUser) {
        return res
          .status(409)
          .send({ error: '409', errorMsg: 'User already exists' });
      }
      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = await userModel.register({
        email,
        passwordHash,
        firstName,
        lastName,
      });
      if (newUser) {
        const accessToken = jwt.sign({ id: newUser.id }, PRIVATE_KEY);
        res.status(201).send({
          token: accessToken,
        });
      }
    } catch (err) {
      res.status(500);
      res.send(err);
      throw new Error('Error while createUser');
    }
  },
  login: async (req: Request, res: Response) => {
    try {
      const credentials = {
        email: req.body.email,
        password: req.body.password,
      };
      const user = await prisma.user.findUnique({
        where: { email: credentials.email },
      });

      if (!user) {
        return res.status(401).send({ errorMsg: 'User does not exist' });
      }

      const correctCredentials = await bcrypt.compare(
        credentials.password,
        user.passwordHash
      );

      if (!correctCredentials) {
        return res.status(401).send({ errorMsg: 'Invalid credentials' });
      } else {
        res.status(200).send({
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        });
      }
    } catch (err) {
      res.status(500);
      res.send(err);
      throw new Error('Error while createUser');
    }
  },
  profile: async (req: RequestWithUser, res: Response) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.id },
      });

      if (!user) {
        return res.status(401).send({ errorMsg: 'User does not exist' });
      }
      res.status(200).send({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      });
    } catch (err) {
      res.status(500);
      res.send(err);
      throw new Error('Error while createUser');
    }
  },
};

export default userController;
