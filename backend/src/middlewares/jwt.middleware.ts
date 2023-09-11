import { NextFunction, Request, Response } from 'express';
import { validateToken } from '../utils/jwt.util';

const validateTokenMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  const user = validateToken(authorization);
  req.body.user = user;

  next();
};

export default validateTokenMiddleware;
