export interface IProduct {
  id: number;
  productName: string;
  urlImage: string;
  price: string;
  stock: number;
}

export interface IProductAction {
  id: number | string;
  productname?: string;
  price?: string;
  value?: string;
}
export interface IProductInCart extends IProductAction {
  quantity: number;
}

export interface ICart {
  [id: number | string]: IProductInCart;
}
