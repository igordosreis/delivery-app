import { Router } from 'express';
import loginRouter from './login.routes';
import registerRouter from './register.routes';
import customerRouter from './customer.routes';

const router = Router();

router.use('/login', loginRouter);
router.use('/register', registerRouter);
router.use('/customer', customerRouter);

export default router;
