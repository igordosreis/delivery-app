import { Router } from 'express';
import { LoginController } from '../controllers';
import validateLoginMiddleware from '../middlewares/login.middleware';

const loginRouter = Router();

loginRouter.post('/', validateLoginMiddleware, LoginController.loginUser);

export default loginRouter;
