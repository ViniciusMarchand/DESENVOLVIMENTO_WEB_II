
import { Router } from 'express';
import { forbiddenError, forbiddenErrorFinanceiro, forbiddenErrorProdutos, forbiddenErrorRelatorios } from '../controllers/error-forbidden-controller.js';

const forbiddenRouter = Router();
forbiddenRouter.get("/error-forbidden", forbiddenError);
forbiddenRouter.get('/error-forbidden-financeiro', forbiddenErrorFinanceiro);
forbiddenRouter.get('/error-forbidden-produtos', forbiddenErrorProdutos);
forbiddenRouter.get('/error-forbidden-relatorios', forbiddenErrorRelatorios);

export default forbiddenRouter;