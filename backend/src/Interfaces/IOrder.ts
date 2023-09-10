import { IProductInOrder } from './IProduct';

export interface IOrder {
  sellerId: number;
  totalPrice: number;
  deliveryAddress: string;
  deliveryNumber: number;
  products: IProductInOrder[];
}

export interface IOrderDb extends IOrder {
  id: number;
  userId: number;
  status: string;
  orderDate: Date;
}
