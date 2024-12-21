import { Router } from 'express';
import authRouter from './auth-route.js';
import categoryRouter from './category-route.js';
import { isAuth } from '../middlewares/is-auth.js';
import todoRouter from './todo-route.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/category', isAuth, categoryRouter);
router.use('/todo', isAuth, todoRouter);

export default router;