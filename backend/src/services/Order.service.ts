import { IOrderDb } from '../Interfaces/IOrder';
import { IUserLogged } from '../Interfaces/IUser';
import OrderModel from '../database/models/OrderModel';

export default class OrderService {
  public static async getAllOrders({ id, role }: IUserLogged): Promise<IOrderDb[]> {
    const userRole = role === 'seller' ? 'sellerId' : 'userId';
    const allOrders = await OrderModel.findAll({
      where: { [userRole]: id },
      raw: true,
    });

    return allOrders;
  }
}
