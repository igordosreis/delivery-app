import UserModel from '../database/models/UserModel';
import { IUser, IUserLogin } from '../Interfaces/IUser';
import { createToken } from '../utils/jwt.util';
import validateLogin from './validations/login.validation';

export default class LoginService {
  public static async login({
    email,
    password,
  }: IUserLogin): Promise<Partial<IUser>> {
    const userFetchResult: IUser | null = await UserModel.findOne({
      where: { email },
      raw: true,
    });

    const validatedUser = validateLogin(password, userFetchResult);

    const token: string = createToken(validatedUser);

    return { ...validatedUser, token };
  }
}
