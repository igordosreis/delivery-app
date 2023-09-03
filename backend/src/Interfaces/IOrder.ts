interface IProduct {
  id: number;
  userId: number;
  sellerId: number;
  totalPrice: number;
  status: string;
  deliveryAddress: string;
  deliveryNumber: number;
  orderDate: Date;
}

export default IProduct;
