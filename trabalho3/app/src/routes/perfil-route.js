import { profilePage } from "../controllers/profile-controller.js";
import { isAuth } from "../middlewares/is-auth.js";
import { Router } from 'express';

const profileRouter = Router();
profileRouter.get('/perfil', isAuth, profilePage);

export default profileRouter;