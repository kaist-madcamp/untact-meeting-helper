import client from '../client';
import * as jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import { NextFunction } from 'express';

export const checkJwt = async (req: Request, _, next: NextFunction) => {
  if ('authorization' in req.headers) {
    const decoded = jwt.verify(
      req.headers['authorization'] as string,
      process.env.PRIVATE_KEY,
    );
    if (typeof decoded === 'object' && 'id' in decoded) {
      const user = await client.user.findUnique({
        where: {
          id: decoded['id'],
        },
      });
      req.headers['user'] = user;
    }
  }

  next();
};
