import { financeiro } from "../controllers/financeiro-controller.js";
import hasAccessFinanceiro from "../middlewares/has-access-financeiro.js";
import { Router } from 'express';

const financeiroRouter = Router();
financeiroRouter.get("/financeiro", hasAccessFinanceiro, financeiro);


export default financeiroRouter;