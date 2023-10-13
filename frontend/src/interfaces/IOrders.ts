import { IProductInOrder } from './IProduct';

export interface IOrderId {
  id: number;
}

export interface IOrderRequest {
  sellerId: number;
  totalPrice: number;
  deliveryAddress: string;
  deliveryNumber: string;
  products: IProductInOrder[];
}

export interface IOrder {
  id: number;
  userId: number;
  sellerId: number;
  totalPrice: string;
  status: string;
  deliveryAddress: string;
  deliveryNumber: string;
  orderDate: string;
}
