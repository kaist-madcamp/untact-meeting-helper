import { NextFunction, Response } from 'express';
import { PrismaClient } from '.prisma/client';
import * as jwt from 'jsonwebtoken';
import client from 'src/client';

const { user } = new PrismaClient();

export const checkUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if ('authorization' in req.headers) {
    const decoded = jwt.verify(
      req.headers['authorization'],
      process.env.PRIVATE_KEY,
    );
    if (typeof decoded === 'object' && 'id' in decoded) {
      const exists = await client.user.findUnique({
        where: {
          id: decoded.in,
        },
      });
      if (!exists) {
        res.json({
          ok: false,
          error: "User doesn't exists.",
        });
      } else {
        req.headers['user'] = exists;
      }
    }
  }

  next();
};
