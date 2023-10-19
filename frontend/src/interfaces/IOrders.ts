import { IProductInOrder } from './IProduct';

export interface IOrderId {
  id: number;
}

export interface IOrderBase {
  sellerId: number;
  totalPrice: string;
  deliveryAddress: string;
  deliveryNumber: string;
}

export interface IOrderRequest extends IOrderBase {
  products: IProductInOrder[];
}

export interface IOrder extends IOrderBase {
  id: number;
  totalPrice: string;
  status: string;
  orderDate: string;
}
