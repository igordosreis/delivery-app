import { NextFunction, Request, Response } from 'express';
import { validateToken } from '../utils/jwt.util';

const validateTokenMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers;
  const { role } = validateToken(authorization);
  req.body.role = role;

  next();
};

export default validateTokenMiddleware;
