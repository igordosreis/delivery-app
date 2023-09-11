import { Request, Response } from 'express';
import { OrderService } from '../services';

export default class OrderController {
  public static async getAllOrders(_req: Request, res: Response): Promise<void> {
    const allProducts = await OrderService;

    res.status(200).json(allProducts);
  }

  public static async getOrderById(_req: Request, res: Response): Promise<void> {
    const allSellers = await OrderService;

    res.status(200).json(allSellers);
  }

  public static async updateStatus(req: Request, res: Response): Promise<void> {
    const { user } = req.body;
    const id = await OrderService;

    res.status(201).json({ user, id });
  }
}
