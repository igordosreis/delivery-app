import { IUser } from '../Interfaces/IUser';
import HttpException from './httpException.util';

const validateEmail = (user: IUser | null): IUser => {
  const isUserNotFound = !user;
  if (isUserNotFound) throw new HttpException(401, 'Incorrect email or password');

  return user;
};

export default validateEmail;
