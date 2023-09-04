import jwt from 'jsonwebtoken';
import 'dotenv/config';
import HttpException from './httpException.util';
import { IUser } from '../Interfaces/IUser';

const jwtSecret = (process.env.JWT_SECRET as string) ?? 'jwtsecret';

const createToken = ({ id, userName, email, role }: Partial<IUser>): string => {
  const token = jwt.sign({ id, userName, email, role }, jwtSecret, {
    algorithm: 'HS256',
    expiresIn: '1d',
  });

  return token;
};

const validateToken = (token: string | undefined): Partial<IUser> => {
  const isTokenMissing = !token;
  if (isTokenMissing) throw new HttpException(404, 'Token missing');

  try {
    const user = jwt.verify(token, jwtSecret);

    return user as Partial<IUser>;
  } catch (error) {
    throw new HttpException(401, 'Invalid token');
  }
};

export { createToken, validateToken };
