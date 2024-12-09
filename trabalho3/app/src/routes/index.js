import { Router } from 'express';
import { isAuth } from '../middlewares/is-auth.js';
import { profilePage } from '../controllers/profile-controller.js';
import isAdminSuperuser from '../middlewares/is-admin-superuser.js';
import mudarFotoPerfil from '../controllers/profile-photo-controller.js';
import multer from 'multer';
import { atualizarPermissoes, permissions } from '../controllers/permissions-controller.js';
import authRouter from './auth-route.js';
import userManagementRouter from './gestao-usuarios-route.js';
import financeiroRouter from './financeiro-route.js';
import produtosRouter from './produtos-route.js';
import relatoriosRouter from './relatorios-route.js';
import homeRouter from './home-route.js';
import profileRouter from './perfil-route.js';
import permissoesRouter from './permissoes-route.js';
import profilePhotoRouter from './foto-perfil.js';
import forbiddenRouter from './forbidden-route.js';

const router = Router();

router.use("/", homeRouter);
router.use("/", profileRouter);

router.use("/", userManagementRouter)
router.use("/", authRouter)


router.use("/", profilePhotoRouter);

router.use("/", permissoesRouter)

router.use("/", financeiroRouter);
router.use("/", relatoriosRouter);
router.use("/",produtosRouter) 

router.use("/", forbiddenRouter);




export default router;