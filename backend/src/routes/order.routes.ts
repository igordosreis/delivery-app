import { Router } from 'express';
import { OrderController } from '../controllers';
import validateTokenMiddleware from '../middlewares/jwt.middleware';

const orderRouter = Router();

orderRouter.get('/', validateTokenMiddleware, OrderController.getAllOrders);

export default orderRouter;
