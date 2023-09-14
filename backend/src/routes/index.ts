import { Router } from 'express';
import loginRouter from './login.routes';
import registerRouter from './register.routes';
import customerRouter from './customer.routes';
import orderRouter from './order.routes';
import adminRouter from './admin.routes';

const router = Router();

router.use('/login', loginRouter);
router.use('/register', registerRouter);
router.use('/customer', customerRouter);
router.use('/orders', orderRouter);
router.use('/admin', adminRouter);

export default router;
