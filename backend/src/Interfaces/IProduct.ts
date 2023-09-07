export interface IProduct {
  id: number;
  productName: string;
  urlImage: string;
  price: number;
  stock: number;
}

export interface IProductInOrder {
  id: number;
  quantity: number;
}

export interface IProductValidated extends IProductInOrder {
  price: number;
}
