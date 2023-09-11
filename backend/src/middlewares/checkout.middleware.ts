import { NextFunction, Request, Response } from 'express';
import HttpException from '../utils/httpException.util';
import mapError from '../utils/mapError.util';
import checkoutSchema from './schemas/checkout.schema';
import { IOrder } from '../Interfaces/IOrder';

const validateCheckoutMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  const { sellerId, totalPrice, deliveryAddress, deliveryNumber, products }: IOrder = req.body;
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
