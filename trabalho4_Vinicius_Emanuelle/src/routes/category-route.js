import { Router } from 'express';
import { CreateCategory, GetCategoriesWithTodos, GetCategoryList, GetShareCategory, GetSharedCategories } from '../controller/category-controller.js';
import { validate } from '../middlewares/validator.js';
import { categorySchema } from '../middlewares/schemas/category-schema.js';

const categoryRouter = Router();

categoryRouter.get('/', GetCategoryList);

categoryRouter.get('/shared', GetSharedCategories);

categoryRouter.post('/', validate(categorySchema), CreateCategory);

categoryRouter.get('/:page', GetCategoriesWithTodos);

categoryRouter.get('/share/:categoryId/:userId', GetShareCategory);


export default categoryRouter;