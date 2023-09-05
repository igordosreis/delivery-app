import { Md5 } from 'ts-md5';
import { IUserLogged, IUserNew } from '../Interfaces/IUser';
import UserModel from '../database/models/UserModel';
import { createToken } from '../utils/jwt.util';
import validateRegisterEmail from './validations/register.validation';

export default class RegisterService {
  public static async registerNewUser({
    userName,
    email,
    password,
  }: IUserNew): Promise<IUserLogged> {
    const [user, created] = await UserModel.findOrCreate({
      where: { email },
      defaults: { userName, password: Md5.hashStr(password) },
    });
    validateRegisterEmail(created);
    const token = createToken(user);

    // Typescript can find the dataValues property
    // const { password: removedPassword, ...userWithoutPassword } = user.dataValues;
    const { id, role, userName: newUserName, email: newEmail } = user;

    return { id, role, userName: newUserName, email: newEmail, token };
  }
}
