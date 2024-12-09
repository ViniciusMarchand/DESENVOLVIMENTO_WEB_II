import { login, loginPage, logout, register, registerPage } from "../controllers/auth-controller.js";
import isAdminSuperuser from "../middlewares/is-admin-superuser.js";
import { Router } from 'express';

const authRouter = Router();

authRouter.get('/register',isAdminSuperuser , registerPage);
authRouter.post('/register',isAdminSuperuser ,register);

authRouter.get('/login' , loginPage);
authRouter.post('/login' , login);

authRouter.get('/logout', logout);

export default authRouter;