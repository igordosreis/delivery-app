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
}

export interface IProductInputAction extends IProductAction {
  value: string;
}

export interface IProductInCart {
  id: number | string;
  productname: string;
  price: string;
  quantity: number;
}

export interface IProductInOrder {
  id: number | string;
  quantity: number | string;
}

export interface ICart {
  [id: number | string]: IProductInCart;
}
