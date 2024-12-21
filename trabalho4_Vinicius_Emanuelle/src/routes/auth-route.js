import { Router } from 'express';
import { login, register, validateEmail } from '../controller/auth-controller.js';
import { isAuth } from '../middlewares/is-auth.js';
import { validate } from '../middlewares/validator.js';
import { userSchema } from '../middlewares/schemas/user-schema.js';
import { loginSchema } from '../middlewares/schemas/login-schema.js';

const authRouter = Router();

authRouter.post('/login', validate(loginSchema), login);

authRouter.post('/register', validate(userSchema), register);

authRouter.get('/validar-email/:token', validateEmail);

export default authRouter;