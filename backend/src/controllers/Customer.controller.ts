import { Request, Response } from 'express';
import { CustomerService } from '../services';

export default class CustomerController {
  public static async getAllProducts(_req: Request, res: Response): Promise<void> {
    const allProducts = await CustomerService.getAllProducts();

    res.status(200).json(allProducts);
  }

  public static async getAllSellers(_req: Request, res: Response): Promise<void> {
    const allSellers = await CustomerService.getAllSellers();

    res.status(200).json(allSellers);
  }

  public static async checkoutCustomerOder(req: Request, res: Response): Promise<void> {
    const { user, ...orderInfo } = req.body;
    const id = await CustomerService.checkoutCustomerOder(orderInfo, user);

    res.status(201).json({ id });
  }
}
