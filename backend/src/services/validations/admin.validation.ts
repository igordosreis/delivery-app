import UserModel from '../../database/models/UserModel';
import HttpException from '../../utils/httpException.util';

const validateEmail = async (email: string) => {
  const isEmailInvalid = await UserModel.findOne({ where: { email } });
  if (isEmailInvalid) throw new HttpException(409, 'Email already registered');
};

const validateId = async (id: string | number) => {
  const isIdInvalid = await UserModel.findByPk(id);
  if (isIdInvalid) throw new HttpException(404, 'User not found');
};

export { validateEmail, validateId };
