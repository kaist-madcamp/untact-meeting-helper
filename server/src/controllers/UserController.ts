import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import client from '../client';
import * as jwt from 'jsonwebtoken';

class UserController {
  static async join(req: Request, res: Response) {
    const { email, username, password } = req.body;
    if (!email || !username || !password)
      res.status(400).json({ ok: false, error: 'Invalid parameters' });

    const exists = await client.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });

    if (exists) {
      return res.json({
        ok: false,
        error: 'User already exists.',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      await client.user.create({
        data: {
          email,
          username,
          password: hashedPassword,
        },
      });
      res.json({
        ok: true,
      });
    } catch (error) {
      console.log(error);
      res.json({
        ok: false,
        error: 'Internal server error',
      });
    }
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!(email && password)) {
      return res.status(400).json({
        ok: false,
        error: 'email or password is null',
      });
    }

    try {
      const userExist = await client.user.findUnique({
        where: {
          email,
        },
      });

      if (!userExist) {
        return res.json({
          ok: false,
          error: '존재하지 않는 계정입니다.',
        });
      }

      console.log(password, userExist.password);
      const passwordOk = await bcrypt.compare(password, userExist.password);
      console.log(passwordOk);
      if (!passwordOk) {
        return res.json({
          ok: false,
          error: '비밀번호 불일치',
        });
      }

      const token = jwt.sign({ id: userExist.id }, process.env.PRIVATE_KEY);

      return res.json({
        ok: true,
        token: token,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default UserController;
