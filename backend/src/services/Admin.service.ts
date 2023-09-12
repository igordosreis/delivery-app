import { Md5 } from 'ts-md5';
import { IUserCreate, IUserLogged } from '../Interfaces/IUser';
import HttpException from '../utils/httpException.util';
import UserModel from '../database/models/UserModel';
import { validateEmail } from './validations/admin.validation';

export default class AdminService {
  public static async createNewUser(
    newUserInfo: IUserCreate,
    { role: loggedUserRole }: IUserLogged,
  ) {
    const isUserNotAdmin = loggedUserRole === 'administrator';
    if (isUserNotAdmin) throw new HttpException(401, 'Unauthorized');

    const { userName, email, password, role } = newUserInfo;
    await validateEmail(email);
    const passwordHash = Md5.hashStr(password);

    await UserModel.create({ userName, email, password: passwordHash, role });
  }
}
