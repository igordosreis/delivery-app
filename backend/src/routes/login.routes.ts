import { Router } from 'express';
import LoginController from '../controllers/Login.controller';
import verifyLoginData from '../middlewares/login.middleware';

const loginRouter = Router();

loginRouter.post('/', verifyLoginData, LoginController.login);

export default loginRouter;
