import { userManagement } from "../controllers/gestao-usuario-controller.js";
import isAdminSuperuser from "../middlewares/is-admin-superuser.js";
import { Router } from 'express';

const userManagementRouter = Router();
userManagementRouter.get('/gestao-usuarios', isAdminSuperuser, userManagement);


export default userManagementRouter;