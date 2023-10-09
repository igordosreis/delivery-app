export interface IProduct {
  id: number;
  productName: string;
  urlImage: string;
  price: string;
  stock: number;
}

export interface ICart {
  [key: number]: IProduct;
}
