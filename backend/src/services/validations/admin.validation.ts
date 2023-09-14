import UserModel from '../../database/models/UserModel';
import HttpException from '../../utils/httpException.util';

const validateEmail = async (email: string): Promise<void> => {
  const isEmailInvalid = await UserModel.findOne({ where: { email } });
  if (isEmailInvalid) throw new HttpException(409, 'Email already registered');
};

const validateId = async (id: string | number): Promise<void> => {
  const user = await UserModel.findByPk(id);
  const isIdInvalid = !user;
  if (isIdInvalid) throw new HttpException(404, 'User not found');
};

const validateUserAuthorization = (role: string): void => {
  const isUserNotAdmin = role !== 'administrator';
  if (isUserNotAdmin) throw new HttpException(401, 'Unauthorized');
};

export { validateEmail, validateId, validateUserAuthorization };
