import IProduct from '../Interfaces/IProduct';
import { IUserDb } from '../Interfaces/IUser';
import ProductModel from '../database/models/ProductModel';
import UserModel from '../database/models/UserModel';

export default class CustomerService {
  public static async getAllProducts(): Promise<IProduct[]> {
    const allProducts = await ProductModel.findAll();

    return allProducts;
  }

  public static async getAllSellers(): Promise<IUserDb[]> {
    const allSellers = UserModel.findAll({
      where: { role: 'seller' },
      attributes: ['id', 'name'],
    });

    return allSellers;
  }
}
