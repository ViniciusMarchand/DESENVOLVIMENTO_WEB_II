import { Router } from 'express';
import isAdminSuperuser  from '../middlewares/is-admin-superuser.js';

import { isAuth } from '../middlewares/is-auth.js';
import { forbiddenPage, gestaoUsuarioPage, perfilPage } from '../controllers/pageController.js';


const router = Router();


router.get('/gestao-usuarios', isAdminSuperuser, gestaoUsuarioPage);

// router.get('/error-forbidden', forbiddenPage);

router.get('/perfil', isAuth, perfilPage);

export default router;