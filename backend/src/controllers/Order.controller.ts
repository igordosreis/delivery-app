import { Request, Response } from 'express';
import { OrderService } from '../services';

export default class OrderController {
  public static async getAllOrders(req: Request, res: Response): Promise<void> {
    const { user } = req.body;
    const allOrders = await OrderService.getAllOrders(user);

    res.status(200).json(allOrders);
  }

  public static async getOrderById(req: Request, res: Response): Promise<void> {
    const { user } = req.body;
    const { id } = req.params;

    const allSellers = await OrderService.getOrderById(id, user);

    res.status(200).json(allSellers);
  }

  public static async updateStatus(req: Request, res: Response): Promise<void> {
    const { status, user } = req.body;
    const { id } = req.params;
    await OrderService.updateStatus(id, status, user);

    res.status(201).json({ user, id });
  }
}
