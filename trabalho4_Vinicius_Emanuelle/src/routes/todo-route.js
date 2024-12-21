import { Router } from 'express';
import { GetLateTodo, GetTodo, GetTodosNotDone, PostCreateTodo, UpdateTodoDone } from '../controller/todo-controller.js';
import { validate } from '../middlewares/validator.js';
import { todoSchema } from '../middlewares/schemas/todo-schema.js';

const todoRouter = Router();

todoRouter.get('/', GetTodo);

todoRouter.post('/', validate(todoSchema), PostCreateTodo);

todoRouter.get('/not-done', GetTodosNotDone);

todoRouter.get('/late', GetLateTodo);

todoRouter.put('/:id/done', UpdateTodoDone);

export default todoRouter;