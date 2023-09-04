import UserModel from '../database/models/UserModel';
import { IUserDb, IUserLogged, IUserLogin } from '../Interfaces/IUser';
import { createToken } from '../utils/jwt.util';
import validateLogin from './validations/login.validation';

export default class LoginService {
  public static async login({ email, password }: IUserLogin): Promise<IUserLogged> {
    const userFetchResult: IUserDb | null = await UserModel.findOne({
      where: { email },
      raw: true,
    });

    const validatedUser = validateLogin(password, userFetchResult);

    const token: string = createToken(validatedUser);

    return { ...validatedUser, token };
  }
}
