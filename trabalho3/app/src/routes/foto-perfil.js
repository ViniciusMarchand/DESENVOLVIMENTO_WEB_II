import { isAuth } from "../middlewares/is-auth.js";
import { Router } from 'express';

import multer from "multer";
import mudarFotoPerfil from "../controllers/profile-photo-controller.js";

const upload = multer({ dest: 'uploads/' });

const profilePhotoRouter = Router();
profilePhotoRouter.post("/mudar-foto-perfil", isAuth, upload.single('foto'), mudarFotoPerfil);

export default profilePhotoRouter;