import { Router } from 'express';
import { OrderController } from '../controllers';
import validateTokenMiddleware from '../middlewares/jwt.middleware';
import validateStatusMiddleware from '../middlewares/order.middleware';

const orderRouter = Router();

orderRouter.get('/', validateTokenMiddleware, OrderController.getAllOrders);
orderRouter.get('/:id', validateTokenMiddleware, OrderController.getOrderById);
orderRouter.patch(
  '/:id',
  validateTokenMiddleware,
  validateStatusMiddleware,
  OrderController.updateStatus,
);

export default orderRouter;
