import { relatorios } from "../controllers/relatorios-controller.js";
import hasAccessRelatorios from "../middlewares/has-access-relatorios.js";
import { Router } from 'express';

const relatoriosRouter = Router();
relatoriosRouter.get("/relatorios", hasAccessRelatorios, relatorios);


export default relatoriosRouter;