// import sequelize, { Transaction } from 'sequelize';
import { IOrder } from '../Interfaces/IOrder';
import { IProduct } from '../Interfaces/IProduct';
import { IUserDb, IUserLogged } from '../Interfaces/IUser';
import ProductModel from '../database/models/ProductModel';
import UserModel from '../database/models/UserModel';
import validateProductsList from './validations/customer.validation';

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

  public static async createOrder(
    _orderInfo: IOrder,
    _userId: number,
  ): Promise<number> {
    // const { sellerId, totalPrice, deliveryAddress, deliveryNumber, products } =
    //   orderInfo;
    // const orderId = new Promise((resolve: Function, reject: Function) => {
    //   sequelize.Transaction((t: Transaction) => {
    //     // a
    //   });
    // });
    return 1;
  }

  public static async checkoutUserOder(
    orderInfo: IOrder,
    userInfo: IUserLogged,
  ): Promise<number> {
    const { products, totalPrice, sellerId } = orderInfo;
    validateProductsList(products, totalPrice, sellerId);

    const { id: userId } = userInfo;
    const orderId = await CustomerService.createOrder(orderInfo, userId);

    return orderId;
  }
}
