/* eslint-disable max-lines-per-function */
import { IOrderDb } from '../Interfaces/IOrder';
import { IUserLogged } from '../Interfaces/IUser';
import OrderModel from '../database/models/OrderModel';
import OrderProductModel from '../database/models/OrderProductModel';
import ProductModel from '../database/models/ProductModel';
import { validateOrderId, validateStatus } from './validations/order.validations';

export default class OrderService {
  public static async getAllOrders({ id, role }: IUserLogged): Promise<IOrderDb[]> {
    const userRole = role === 'seller' ? 'sellerId' : 'userId';
    const allOrders = await OrderModel.findAll({
      where: { [userRole]: id },
      raw: true,
    });

    return allOrders;
  }

  public static async getOrderById(orderId: number | string, { id: userId, role }: IUserLogged) {
    const userRole = role === 'seller' ? 'sellerId' : 'userId';

    const validatedOrder = await validateOrderId(orderId, userRole, userId);
    const {
      totalPrice,
      orderDate,
      status,
      id: validatedOrderId,
      seller: { userName: sellerName },
    } = validatedOrder;

    const products = await OrderProductModel.findAll({
      where: { orderId: validatedOrderId },
      attributes: ['quantity'],
      include: {
        model: ProductModel,
        as: 'product',
        attributes: ['id', 'productName', 'price', 'urlImage'],
      },
    });

    return { orderId, totalPrice, orderDate, status, sellerName, products };
  }

  public static async updateStatus(
    orderId: number | string,
    status: string,
    { role }: IUserLogged,
  ) {
    const isUserCustomer = role === 'customer';
    if (isUserCustomer) await validateStatus(orderId, status);
    await OrderModel.update({ status }, { where: { id: orderId } });
  }
}
