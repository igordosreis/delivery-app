import { NextFunction, Request, Response } from 'express';
import HttpException from '../utils/httpException.util';
import mapError from '../utils/mapError.util';
import statusSchema from './schemas/status.schema';

const validateStatusMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  const { status } = req.body;
  const { error } = statusSchema.validate({ status });

  const isStatusInvalid = error;
  if (isStatusInvalid) {
    const { type, message } = error.details[0];
    const errorStatusCode = mapError(type);

    throw new HttpException(errorStatusCode, message);
  }

  next();
};

export default validateStatusMiddleware;
