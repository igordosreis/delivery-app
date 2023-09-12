import { Router } from 'express';
import { AdminController } from '../controllers';
import validateTokenMiddleware from '../middlewares/jwt.middleware';
import validateCreateNewUserMiddleware from '../middlewares/admin.middleware';

const adminRouter = Router();

adminRouter.post('/', validateTokenMiddleware, AdminController.createNewUser);
adminRouter.get(
  '/',
  validateTokenMiddleware,
  validateCreateNewUserMiddleware,
  AdminController.getAllUsers,
);

export default adminRouter;
