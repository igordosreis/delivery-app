import { Router } from 'express';
import { CustomerController } from '../controllers';
import validateTokenMiddleware from '../middlewares/jwt.middleware';
import validateCheckoutMiddleware from '../middlewares/checkout.middleware';

const customerRouter = Router();

customerRouter.get('/products', validateTokenMiddleware, CustomerController.getAllProducts);

customerRouter.get('/seller', validateTokenMiddleware, CustomerController.getAllSellers);

customerRouter.post(
  '/checkout',
  validateTokenMiddleware,
  validateCheckoutMiddleware,
  CustomerController.checkoutCustomerOder,
);

export default customerRouter;
