import Joi from 'joi';
import { IUserLogin } from '../../Interfaces/IUser';

const loginSchema = Joi.object<IUserLogin>({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export default loginSchema;
