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
  return validatedProductsList;
};

const validateProductsList = (productsList: IProductInOrder[]) => {
  checkRepeatedIds(productsList);
  const products = checkIfProductsExist(productsList);

  return products;
};

export default validateProductsList;
