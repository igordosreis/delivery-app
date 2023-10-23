import Joi from 'joi';
import { IUserRegister } from '../../Interfaces/IUser';

const registerNewUserSchema = Joi.object<IUserRegister>({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  userName: Joi.string().min(3).required(),
});

export default registerNewUserSchema;
