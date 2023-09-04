import { Request, Response } from 'express';
import LoginService from '../services/Login.service';
import { IUserLogin } from '../Interfaces/IUser';

export default class LoginController {
  public static async login(req: Request, res: Response) {
    const { email, password }: IUserLogin = req.body;

    const user = await LoginService.login({ email, password });

    res.status(200).json(user);
  }
}
