import { home } from "../controllers/home-controller.js";
import { Router } from 'express';
import { isAuth } from "../middlewares/is-auth.js";

const homeRouter = Router();
homeRouter.get('/home', isAuth, home)


export default homeRouter;