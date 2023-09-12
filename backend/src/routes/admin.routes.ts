import { Router } from 'express';
import { AdminController } from '../controllers';

const adminRouter = Router();

adminRouter.post('/', AdminController.createNewUser);

export default adminRouter;
