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
adminRouter.delete('/:id', validateTokenMiddleware, AdminController.deleteUserById);

export default adminRouter;
