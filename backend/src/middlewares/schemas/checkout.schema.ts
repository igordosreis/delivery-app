import Joi from 'joi';
import { IOrderCheckout } from '../../Interfaces/IOrder';
import { IProductInOrder } from '../../Interfaces/IProduct';

const productsSchema = Joi.object<IProductInOrder>({
  id: Joi.number().required(),
  quantity: Joi.number().required(),
});

const checkoutSchema = Joi.object<IOrderCheckout>({
  sellerId: Joi.number().required(),
  totalPrice: Joi.number().required(),
  deliveryAddress: Joi.string().required(),
  deliveryNumber: Joi.number().required(),
  products: Joi.array().items(productsSchema).required(),
});

export default checkoutSchema;
