import { Md5 } from 'ts-md5';
import { IUserLogged, IUserNew } from '../Interfaces/IUser';
import UserModel from '../database/models/UserModel';
import HttpException from '../utils/httpException.util';
import { createToken } from '../utils/jwt.util';

export default class RegisterService {
  public static async registerNewUser({
    userName,
    email,
    password,
  }: IUserNew): Promise<IUserLogged> {
    const [user, created] = await UserModel.findOrCreate({
      where: { email },
      defaults: { userName, password: Md5.hashStr(password) },
      raw: true,
    });

    const isEmailAlreadyRegistered = !created;
    if (isEmailAlreadyRegistered) {
      throw new HttpException(409, 'Email already in use');
    }

    const token = createToken(user);
    const { password: removedPassword, ...userWithoutPassword } = user;

    return { ...userWithoutPassword, token };
  }
}
