import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { COOKIE_NAME } from '../constants';

export interface RequestWithUser extends Request {
  id?: string;
}

const PRIVATE_KEY = process.env.JWT_SECRET || 'test';

export async function auth(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies[COOKIE_NAME];
  if (!token) return res.sendStatus(403);
  try {
    const decryptedToken = jwt.verify(token, PRIVATE_KEY) as JwtPayload;
    const id = decryptedToken.id;
    req.id = id;
    next();
  } catch (error) {
    res.sendStatus(401);
  }
}
