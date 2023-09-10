/* eslint-disable max-lines-per-function */
// import sequelize, { Transaction } from 'sequelize';
import { IOrder } from '../Interfaces/IOrder';
import { IProduct } from '../Interfaces/IProduct';
import { IUserDb, IUserLogged } from '../Interfaces/IUser';
import ProductModel from '../database/models/ProductModel';
import UserModel from '../database/models/UserModel';
import validateProductsList from './validations/customer.validation';
import OrderModel from '../database/models/OrderModel';
import OrderProductModel from '../database/models/OrderProductModel';
import HttpException from '../utils/httpException.util';

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

  public static async createOrder(orderInfo: IOrder, userId: number): Promise<number> {
    const { sellerId, totalPrice, deliveryAddress, deliveryNumber, products } = orderInfo;
    const t = await OrderModel.sequelize?.transaction();
    try {
      const { id: orderId } = await OrderModel.create({
        userId,
        sellerId,
        totalPrice,
        deliveryAddress,
        deliveryNumber,
        raw: true,
      });
      // const { id: orderId } = await OrderModel.create({ userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, raw: true},
      //   {transaction: t});
      const orderProductPromise = products.map(async ({ id, quantity }) => {
        await OrderProductModel.create({ orderId, productId: id, quantity });
      });
      await Promise.all(orderProductPromise);
      await t?.commit();

      return orderId;
    } catch (err) {
      await t?.rollback();

      throw new HttpException(500, 'Internal error');
    }
    // await OrderModel.sequelize?.transaction(async (transaction) => {
    //   await OrderModel.
    // });
    // const t = new sequelize.Transaction(async (t) => {}, { transaction: t });
    // const orderId = new Promise((resolve: Function, reject: Function) => {
    //   sequelize.Transaction((t: Transaction) => {
    //     // a
    //   });
    // });
  }

  public static async checkoutUserOder(orderInfo: IOrder, userInfo: IUserLogged): Promise<number> {
    const { products, totalPrice, sellerId } = orderInfo;
    validateProductsList(products, totalPrice, sellerId);

    const { id: userId } = userInfo;
    const orderId = await CustomerService.createOrder(orderInfo, userId);

    return orderId;
  }
}
