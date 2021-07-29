import express from 'express';
import jwt from 'jsonwebtoken';
import client from '../client';
import multer from 'multer';
import path from 'path';

export const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename(req, file, cb) {
      cb(null, new Date().valueOf() + path.extname(file.originalname));
    },
  }),
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
}).single('file');

export const verify = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const token = req.headers['authorization'];
  if (!token) {
    res.status(401).json({
      ok: false,
      error: 'Please login.',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
    if (typeof decoded === 'object' && 'id' in decoded) {
      const user = await client.user.findUnique({
        where: {
          id: decoded['id'],
        },
        select: {
          id: true,
        },
      });
      if (!user) {
        return res.status(401).json({
          ok: false,
          error: 'Unauthorized user.',
        });
      }
      res.locals.userId = user.id;
    }
    next();
  } catch (error) {
    res.status(500).json({
      ok: false,
      error,
    });
  }
};
