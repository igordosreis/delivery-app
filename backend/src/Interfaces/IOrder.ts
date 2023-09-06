interface IOrder {
  id: number;
  userId: number;
  sellerId: number;
  totalPrice: number;
  status: string;
  deliveryAddress: string;
  deliveryNumber: number;
  orderDate: Date;
}

export default IOrder;
