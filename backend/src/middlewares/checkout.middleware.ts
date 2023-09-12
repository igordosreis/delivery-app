/* eslint-disable max-lines-per-function */
import { NextFunction, Request, Response } from 'express';
import HttpException from '../utils/httpException.util';
import mapError from '../utils/mapError.util';
import checkoutSchema from './schemas/checkout.schema';
import { IOrderCheckout } from '../Interfaces/IOrder';

const validateCheckoutMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  // eslint-disable-next-line operator-linebreak
  const { sellerId, totalPrice, deliveryAddress, deliveryNumber, products }: IOrderCheckout =
    req.body;

  const { error } = checkoutSchema.validate({
    sellerId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    products,
  });

  const isOrderDataInvalid = error;
  if (isOrderDataInvalid) {
    const { type, message } = error.details[0];
    const errorStatusCode = mapError(type);

    throw new HttpException(errorStatusCode, message);
  }

  next();
};

export default validateCheckoutMiddleware;
