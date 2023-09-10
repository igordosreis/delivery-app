import { Request, Response } from 'express';
import { RegisterService } from '../services';

export default class RegisterController {
  public static async registerNewUser(req: Request, res: Response): Promise<void> {
    const { userName, email, password } = req.body;

    const user = await RegisterService.registerNewUser({
      userName,
      email,
      password,
    });

    res.status(201).json(user);
  }
}
