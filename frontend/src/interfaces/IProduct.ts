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

export interface IProductInOrderRequest {
  id: number | string;
  quantity: number | string;
}

export interface IProductInOrder {
  quantity: number | string;
  product: {
    id: number | string;
    price: string;
    productName: string;
    url: string;
  };
}

export interface ICart {
  [id: number | string]: IProductInCart;
}
