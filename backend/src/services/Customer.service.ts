/* eslint-disable max-lines-per-function */
import sequelize from '../database/models';
import { IOrderCheckout } from '../Interfaces/IOrder';
import { IProduct } from '../Interfaces/IProduct';
import { IUserDb, IUserLogged } from '../Interfaces/IUser';
import ProductModel from '../database/models/ProductModel';
import UserModel from '../database/models/UserModel';
import OrderModel from '../database/models/OrderModel';
import OrderProductModel from '../database/models/OrderProductModel';
import validateOrderInfo from './validations/customer.validation';
import HttpException from '../utils/httpException.util';

export default class CustomerService {
  public static async getAllProducts(): Promise<IProduct[]> {
    const allProducts = await ProductModel.findAll();

    return allProducts;
  }

  public static async getAllSellers(): Promise<IUserDb[]> {
    const allSellers = UserModel.findAll({
      where: { role: 'seller' },
      attributes: ['id', 'userName'],
    });

    return allSellers;
  }

  public static async createOrder(
    orderInfo: IOrderCheckout,
    userId: number | string,
  ): Promise<number> {
    const { sellerId, totalPrice, deliveryAddress, deliveryNumber, products } = orderInfo;
    const t = await sequelize.transaction();

    try {
      const { id: orderId } = await OrderModel.create(
        { userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, raw: true },
        { transaction: t },
      );
      const orderProductPromise = products.map(async ({ id, quantity }) => {
        await OrderProductModel.create({ orderId, productId: id, quantity }, { transaction: t });
      });
      await Promise.all(orderProductPromise);
      await t.commit();

      return orderId;
    } catch (error) {
      await t.rollback();

      throw new HttpException(500, 'Internal server error');
    }
  }

  public static async checkoutCustomerOder(
    orderInfo: IOrderCheckout,
    userInfo: IUserLogged,
  ): Promise<number> {
    const { products, totalPrice, sellerId } = orderInfo;
    validateOrderInfo(products, totalPrice, sellerId);

    const { id: userId } = userInfo;
    const orderId = await CustomerService.createOrder(orderInfo, userId);

    return orderId;
  }
}
