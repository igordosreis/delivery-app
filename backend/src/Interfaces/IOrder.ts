import { IProductInOrder } from './IProduct';

export interface IOrder {
  sellerId: string;
  totalPrice: number;
  deliveryAddress: string;
  deliveryNumber: string;
}

export interface IOrderCheckout extends IOrder {
  products: IProductInOrder[];
}

export interface IOrderDb extends IOrder {
  id: number;
  userId: string;
  status: string;
  orderDate: Date;
}
