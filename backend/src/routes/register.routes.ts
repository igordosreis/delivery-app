import { Router } from 'express';
import RegisterController from '../controllers/Register.controller';

const registerRouter = Router();

registerRouter.post('/', RegisterController.registerNewUser);

export default registerRouter;
