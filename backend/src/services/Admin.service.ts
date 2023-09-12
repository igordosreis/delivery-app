import { Op } from 'sequelize';
import { Md5 } from 'ts-md5';
import { IUser, IUserCreate, IUserLogged } from '../Interfaces/IUser';
import UserModel from '../database/models/UserModel';
import { validateEmail, validateUserAuthorization } from './validations/admin.validation';

export default class AdminService {
  public static async createNewUser(
    newUserInfo: IUserCreate,
    { role: loggedUserRole }: IUserLogged,
  ): Promise<void> {
    validateUserAuthorization(loggedUserRole);

    const { userName, email, password, role } = newUserInfo;
    await validateEmail(email);
    const passwordHash = Md5.hashStr(password);

    await UserModel.create({ userName, email, password: passwordHash, role });
  }

  public static async getAllUsers({ role }: IUserLogged): Promise<IUser[]> {
    validateUserAuthorization(role);

    const allUsers = await UserModel.findAll({
      where: { role: { [Op.not]: 'administrator' } },
      attributes: ['id', 'userName', 'role', 'email'],
    });

    return allUsers;
  }
}
