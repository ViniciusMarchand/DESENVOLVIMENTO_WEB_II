import { Router } from 'express';
import { isAuth } from '../middlewares/is-auth.js';
import { profilePage } from '../controllers/profile-controller.js';
import { userManagement } from '../controllers/gestao-usuario.js';
import isAdminSuperuser from '../middlewares/is-admin-superuser.js';
import { register, registerPage } from '../controllers/auth-controller.js';
import { home } from '../controllers/home-controller.js';
import mudarFotoPerfil from '../controllers/profile-photo-controller.js';
import multer from 'multer';
import { atualizarPermissoes, permissions } from '../controllers/permissions-controller.js';
import { financeiro } from '../controllers/financeiro-controller.js';
import hasAccessFinanceiro from '../middlewares/has-access-financeiro.js';
import { relatorios } from '../controllers/relatorios-controller.js';
import { produtos } from '../controllers/produtos-controller.js';
import hasAccessRelatorios from '../middlewares/has-access-relatorios.js';
import hasAccessProdutos from '../middlewares/has-access-produtos.js';



const upload = multer({ dest: 'uploads/' })

const router = Router();

// router.use("/", pageRoutes);

router.get('/home', home)

router.get('/perfil', isAuth, profilePage);

router.get("/error-forbidden",(req, res) => {
    res.render('error-forbidden');
});

router.get('/gestao-usuarios', isAdminSuperuser, userManagement);

router.get('/register',isAdminSuperuser , registerPage);
router.post('/register',isAdminSuperuser ,register);

router.post("/mudar-foto-perfil", isAuth, upload.single('foto'), mudarFotoPerfil);

router.get("/permissoes",isAdminSuperuser , permissions);
router.post("/atualizar-permissoes/:id",isAdminSuperuser , atualizarPermissoes);

router.get("/financeiro", hasAccessFinanceiro, financeiro);
router.get("/relatorios", hasAccessRelatorios, relatorios);
router.get("/produtos", hasAccessProdutos, produtos);

export default router;