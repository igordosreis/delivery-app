/* eslint-disable max-lines-per-function */
import { IOrderDb } from '../Interfaces/IOrder';
import { IUserLogged } from '../Interfaces/IUser';
import OrderModel from '../database/models/OrderModel';
import OrderProductModel from '../database/models/OrderProductModel';
import ProductModel from '../database/models/ProductModel';
import { validateOrderId } from './validations/order.validations';

export default class OrderService {
  public static async getAllOrders({ id, role }: IUserLogged): Promise<IOrderDb[]> {
    const userRole = role === 'seller' ? 'sellerId' : 'userId';
    const allOrders = await OrderModel.findAll({
      where: { [userRole]: id },
      raw: true,
    });

    return allOrders;
  }

  public static async getOrderById(orderId: number, { id: userId, role }: IUserLogged) {
    const userRole = role === 'seller' ? 'sellerId' : 'userId';

    const validatedOrder = await validateOrderId(orderId, userRole, userId);
    const { totalPrice, orderDate, status, id: validatedOrderId } = validatedOrder || {};

    const products = await OrderProductModel.findAll({
      where: { orderId: validatedOrderId },
      attributes: ['quantity'],
      include: {
        model: ProductModel,
        as: 'product',
        attributes: ['id', 'userName', 'price', 'urlImage'],
      },
    });

    // typescript sequelize workaround
    const userName = validatedOrder?.seller?.userName;

    return { orderId, totalPrice, orderDate, status, userName, products };
  }
}
