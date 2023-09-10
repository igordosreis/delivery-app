import { Request, Response } from 'express';
import { LoginService } from '../services';
import { IUserLogin } from '../Interfaces/IUser';

export default class LoginController {
  public static async loginUser(req: Request, res: Response): Promise<void> {
    const { email, password }: IUserLogin = req.body;

    const user = await LoginService.loginUser({ email, password });

    res.status(200).json(user);
  }
}
