import { Router } from 'express';
import { CustomerController } from '../controllers';

const customerRouter = Router();

customerRouter.get('/products', CustomerController.getAllProducts);

customerRouter.get('/seller', CustomerController.getAllSellers);

export default customerRouter;
