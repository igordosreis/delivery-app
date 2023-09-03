import { Request, Response } from 'express';
import UserService from '../services/User.service';
import { IUserLogin } from '../Interfaces/IUser';

export default class UserController {
  public static async login(req: Request, res: Response) {
    const { email, password }: IUserLogin = req.body;

    const token = await UserService.login({ email, password });

    res.status(200).json({ token });
  }
}
