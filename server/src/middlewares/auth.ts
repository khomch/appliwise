import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export interface RequestWithUser extends Request {
    id?: string;
  }

const PRIVATE_KEY = process.env.PRIVATE_KEY || 'test';

export async function auth(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
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
