import { IProductInOrder } from './IProduct';

export interface IOrder {
  sellerId: string | number;
  totalPrice: number;
  deliveryAddress: string;
  deliveryNumber: string;
}

export interface IOrderCheckout extends IOrder {
  products: IProductInOrder[];
}

export interface IOrderDb extends IOrder {
  id: number;
  userId: string | number;
  status: string;
  orderDate: Date;
}

export interface IOrderWithSellerInfo extends IOrderDb {
  seller: { userName: string };
}
