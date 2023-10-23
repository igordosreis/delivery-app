import { Router } from 'express';
import { RegisterController } from '../controllers';
import validateRegisterNewUserMiddleware from '../middlewares/register.middleware';

const registerRouter = Router();

registerRouter.post('/', validateRegisterNewUserMiddleware, RegisterController.registerNewUser);

export default registerRouter;
