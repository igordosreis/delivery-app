import ProductModel from '../database/models/ProductModel';

export default class CustomerService {
  public static async getAllProducts() {
    const allProducts = await ProductModel.findAll();

    return allProducts;
  }
}
