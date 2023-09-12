import { Request, Response } from 'express';
import { AdminService } from '../services';

export default class AdminController {
  public static async createNewUser(req: Request, res: Response): Promise<void> {
    const { email, password, userName, role, user } = req.body;

    await AdminService.createNewUser({ email, password, userName, role }, user);

    res.status(201).end();
  }

  public static async getAllUsers(req: Request, res: Response): Promise<void> {
    const { user } = req.body;

    const allUsers = await AdminService.getAllUsers(user);

    res.status(200).json(allUsers);
  }
}
