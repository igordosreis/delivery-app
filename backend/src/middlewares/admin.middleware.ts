import { NextFunction, Request, Response } from 'express';
import HttpException from '../utils/httpException.util';
import mapError from '../utils/mapError.util';
import { IUserCreate } from '../Interfaces/IUser';
import createNewUserSchema from './schemas/admin.schema';

const validateCreateNewUserMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  const { email, password, userName, role }: IUserCreate = req.body;
  const { error } = createNewUserSchema.validate({ email, password, userName, role });

  const isNewUserDataInvalid = error;
  if (isNewUserDataInvalid) {
    const { type, message } = error.details[0];
    const errorStatusCode = mapError(type);

    throw new HttpException(errorStatusCode, message);
  }

  next();
};

export default validateCreateNewUserMiddleware;
