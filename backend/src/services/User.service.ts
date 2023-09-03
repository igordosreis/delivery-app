import UserModel from '../database/models/UserModel';
import { IUser, IUserLogin } from '../Interfaces/IUser';
import { createToken } from '../utils/jwt.util';
import validateEmail from '../utils/validateEmail.util';
import validatePassword from '../utils/validatePassword.util';

export default class UserService {
  public static async login({
    email,
    password,
  }: IUserLogin): Promise<Partial<IUser>> {
    const userFetchResult: IUser | null = await UserModel.findOne({
      where: { email },
    });

    const userFromDB: IUser = validateEmail(userFetchResult);
    validatePassword(password, userFromDB.password);

    const token: string = createToken(userFromDB);
    const { id, ...userWithoutId } = userFromDB;

    return { ...userWithoutId, token };
  }
}
