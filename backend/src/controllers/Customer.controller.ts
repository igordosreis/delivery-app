import { Request, Response } from 'express';
import { CustomerService } from '../services';

export default class CustomerController {
  public static async getAllProducts(_req: Request, res: Response): Promise<void> {
    const allProducts = await CustomerService.getAllProducts();

    res.status(200).json(allProducts);
  }
}
