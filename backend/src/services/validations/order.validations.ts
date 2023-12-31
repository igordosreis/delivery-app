/* eslint-disable max-lines-per-function */
import { IOrderWithSellerInfo } from '../../Interfaces/IOrder';
import OrderModel from '../../database/models/OrderModel';
import UserModel from '../../database/models/UserModel';
import HttpException from '../../utils/httpException.util';

const validateOrderId = async (
  orderId: number | string,
  userRole: string,
  userId: string | number,
): Promise<IOrderWithSellerInfo> => {
  const orderInfo = await OrderModel.findOne({
    where: { id: orderId, [userRole]: userId },
    include: [
      {
        model: UserModel,
        as: 'seller',
        attributes: ['userName'],
      },
    ],
  });

  // const isOrderNotFound = !orderId;
  if (!orderInfo) throw new HttpException(404, 'Order not found');

  return orderInfo as unknown as IOrderWithSellerInfo;
};

const validateStatus = async (id: number | string, status: string): Promise<void> => {
  const orderInfo = await OrderModel.findOne({ where: { id } });

  const isStatusInvalid = orderInfo?.status !== 'Em Trânsito' || status !== 'Entregue';
  if (isStatusInvalid) throw new HttpException(401, 'Unauthorized');
};

export { validateOrderId, validateStatus };
