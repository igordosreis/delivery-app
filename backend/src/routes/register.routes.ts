import { Router } from 'express';
import { RegisterController } from '../controllers';

const registerRouter = Router();

registerRouter.post('/', RegisterController.registerNewUser);

export default registerRouter;
