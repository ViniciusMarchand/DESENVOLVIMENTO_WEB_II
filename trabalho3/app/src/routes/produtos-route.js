import { produtos } from "../controllers/produtos-controller.js";
import hasAccessProdutos from "../middlewares/has-access-produtos.js";
import { Router } from 'express';

const produtosRouter = Router();
produtosRouter.get("/produtos", hasAccessProdutos, produtos);


export default produtosRouter;