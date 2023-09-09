import { IProductInOrder, IProductValidated } from '../../Interfaces/IProduct';
import ProductModel from '../../database/models/ProductModel';
import HttpException from '../../utils/httpException.util';

const checkRepeatedIds = (productsList: IProductInOrder[]): void => {
  const idsList = productsList.map(({ id }) => id);
  const isIdRepeated = idsList.some((id, index) => idsList.indexOf(id) !== index);
  if (isIdRepeated) {
    throw new HttpException(400, 'There are duplicated products in the order');
  }
};

const checkIfProductsExist = (
  productsList: IProductInOrder[],
): IProductValidated[] => {
  const productsListPromise = productsList.map(async ({ id, quantity }) => {
    const product = await ProductModel.findOne({
      where: { id },
      raw: true,
      attributes: ['id', 'price'],
    });

    const isProductNotFound = !product;
    if (isProductNotFound) throw new HttpException(404, 'Product not found');

    return { ...product, quantity };
  });
  const validatedProductsList = Promise.all(productsListPromise);

  return validatedProductsList as unknown as IProductValidated[];
};

const checkTotalPrice = (productsList: IProductValidated[], totalPrice: number) => {
  const validatedPrice = productsList.reduce((accPrice, currProduct) => {
    const productTotal = currProduct.quantity * Number(currProduct.price);
    return accPrice + productTotal;
  }, 0);

  const isPriceNotEqual = Math.abs(+validatedPrice - +totalPrice) >= 0.01;
  if (isPriceNotEqual) throw new HttpException(400, 'Invalid total price');
};

const validateProductsList = (
  productsList: IProductInOrder[],
  totalPrice: number,
  _sellerId: number,
) => {
  checkRepeatedIds(productsList);
  const validatedProducts = checkIfProductsExist(productsList);
  checkTotalPrice(validatedProducts, totalPrice);

  return validatedProducts;
};

export default validateProductsList;
