import express, { Request, Response, Router } from 'express';
import { PrismaClient } from '.prisma/client';
import { checkJwt } from '../middlewares/CheckJwt';
import UserController from '../controllers/userController';

const userRouter: express.Router = express.Router();

userRouter.post('/join', UserController.join);
userRouter.post('/login', UserController.login);

export default userRouter;
