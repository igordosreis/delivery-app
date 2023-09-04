import { Router } from 'express';
import LoginController from '../controllers/Login.controller';

const loginRouter = Router();

loginRouter.post('/', LoginController.login);

export default loginRouter;
