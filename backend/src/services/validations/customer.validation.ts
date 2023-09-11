import { IProductInOrder, IProductValidated } from '../../Interfaces/IProduct';
import ProductModel from '../../database/models/ProductModel';
import UserModel from '../../database/models/UserModel';
import HttpException from '../../utils/httpException.util';

const checkRepeatedIds = (productsList: IProductInOrder[]): void => {
  const idsList = productsList.map(({ id }) => id);
  const isIdRepeated = idsList.some((id, index) => idsList.indexOf(id) !== index);
  if (isIdRepeated) {
    throw new HttpException(400, 'There are duplicated products in the order');
  }
};

const checkIfProductsExist = async (
  productsList: IProductInOrder[],
): Promise<IProductValidated[]> => {
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
  const validatedProductsList = await Promise.all(productsListPromise);

  return validatedProductsList as unknown as IProductValidated[];
};

const checkTotalPrice = (productsList: IProductValidated[], totalPrice: number): void => {
  const validatedPrice = productsList.reduce((accPrice, currProduct) => {
    const productTotal = currProduct.quantity * Number(currProduct.price);
    return accPrice + productTotal;
  }, 0);

  const isPriceNotEqual = Math.abs(+validatedPrice - +totalPrice) >= 0.01;
  if (isPriceNotEqual) throw new HttpException(400, 'Invalid total price');
};

const checkSeller = async (sellerId: number): Promise<void> => {
  const seller = await UserModel.findOne({ where: { id: sellerId }, raw: true });

  const isSellerNotFound = !seller;
  if (isSellerNotFound) throw new HttpException(404, 'Seller not found');

  const isUserFoundNotSeller = seller.role !== 'seller';
  if (isUserFoundNotSeller) throw new HttpException(401, 'User is not a seller');
};

const validateProductsList = async (
  productsList: IProductInOrder[],
  totalPrice: number,
  sellerId: number,
): Promise<void> => {
  checkRepeatedIds(productsList);
  const validatedProducts = await checkIfProductsExist(productsList);
  checkTotalPrice(validatedProducts, totalPrice);
  await checkSeller(sellerId);
};

export default validateProductsList;
