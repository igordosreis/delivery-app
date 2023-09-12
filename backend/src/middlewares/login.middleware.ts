import { NextFunction, Request, Response } from 'express';
import HttpException from '../utils/httpException.util';
import mapError from '../utils/mapError.util';
import loginSchema from './schemas/login.schema';
import { IUserLogin } from '../Interfaces/IUser';

const validateLoginMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  const { email, password }: IUserLogin = req.body;
  const { error } = loginSchema.validate({ email, password });

  const isLoginDataInvalid = error;
  if (isLoginDataInvalid) {
    const { type, message } = error.details[0];
    const errorStatusCode = mapError(type);

    throw new HttpException(errorStatusCode, message);
  }

  next();
};

export default validateLoginMiddleware;
