import Joi from 'joi';
import { IUserCreate } from '../../Interfaces/IUser';

const createNewUserSchema = Joi.object<IUserCreate>({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  userName: Joi.string().min(2).required(),
  role: Joi.string().valid('administrator', 'seller', 'customer').required(),
});

export default createNewUserSchema;
