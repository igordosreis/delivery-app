import { Md5 } from 'ts-md5';
import HttpException from './httpException.util';

const validatePassword = async (
  passwordFromRequest: string,
  passwordFromDb: string,
): Promise<void> => {
  const passwordHash = Md5.hashStr(passwordFromRequest);
  const isPasswordInvalid = passwordFromDb !== passwordHash;

  if (isPasswordInvalid) throw new HttpException(401, 'Incorrect email or password');
};

export default validatePassword;
