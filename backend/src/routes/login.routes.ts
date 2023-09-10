import { Router } from 'express';
import { LoginController } from '../controllers';
import verifyLoginData from '../middlewares/login.middleware';

const loginRouter = Router();

loginRouter.post('/', verifyLoginData, LoginController.loginUser);

export default loginRouter;
