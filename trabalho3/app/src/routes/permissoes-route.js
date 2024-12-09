import { atualizarPermissoes, permissions } from "../controllers/permissions-controller.js";
import isAdminSuperuser from "../middlewares/is-admin-superuser.js";
import { Router } from 'express';


const permissoesRouter = Router();
permissoesRouter.get("/permissoes",isAdminSuperuser , permissions);

permissoesRouter.post("/atualizar-permissoes/:id",isAdminSuperuser , atualizarPermissoes);



export default permissoesRouter;