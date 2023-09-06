import IProduct from '../Interfaces/IProduct';
import ProductModel from '../database/models/ProductModel';

export default class CustomerService {
  public static async getAllProducts(): Promise<IProduct[]> {
    const allProducts = await ProductModel.findAll();

    return allProducts;
  }
}
