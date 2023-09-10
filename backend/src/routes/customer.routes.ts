import { Router } from 'express';
import { CustomerController } from '../controllers';
import validateTokenMiddleware from '../middlewares/jwt.middleware';

const customerRouter = Router();

customerRouter.get('/products', validateTokenMiddleware, CustomerController.getAllProducts);

customerRouter.get('/seller', validateTokenMiddleware, CustomerController.getAllSellers);

customerRouter.post('/checkout', validateTokenMiddleware, CustomerController.checkoutCustomerOder);

export default customerRouter;
