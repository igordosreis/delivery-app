import { Router } from 'express';
import { CustomerController } from '../controllers';

const customerRouter = Router();

customerRouter.post('/', CustomerController.getAllProducts);

export default customerRouter;
