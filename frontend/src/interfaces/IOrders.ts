import { IProductInOrder, IProductInOrderRequest } from './IProduct';

export interface IOrderId {
  id: number;
}

export interface IOrderBase {
  totalPrice: string;
  deliveryAddress: string;
  deliveryNumber: string;
}

export interface IOrderRequest extends IOrderBase {
  sellerId: number;
  products: IProductInOrderRequest[];
}

export interface IOrder extends IOrderBase {
  id: number;
  status: string;
  orderDate: string;
  sellerName: string;
  products: IProductInOrder[];
}
