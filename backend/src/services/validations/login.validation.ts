import { Md5 } from 'ts-md5';
import HttpException from '../../utils/httpException.util';
import { IUser } from '../../Interfaces/IUser';

const validateLogin = (
  password: string,
  userFetchResult: IUser | null,
): Partial<IUser> => {
  const isUserNotFound = !userFetchResult;
  if (isUserNotFound) throw new HttpException(401, 'Incorrect email or password');

  const passwordHash = Md5.hashStr(password);
  const isPasswordInvalid = userFetchResult.password !== passwordHash;
  if (isPasswordInvalid) throw new HttpException(401, 'Incorrect email or password');

  const { password: removedPassword, ...userWithoutPassword } = userFetchResult;

  return userWithoutPassword;
};

export default validateLogin;
