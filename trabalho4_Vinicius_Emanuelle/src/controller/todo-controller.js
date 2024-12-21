import { CreateTodo, GetAllTodo, LateTodos, TodoDone, TodosNotDone } from "../service/todo-service.js";
import { getUserByReq } from "../utils/index.js";

async function GetTodo(req, res) {

    const userId = getUserByReq(req).id;

    const todos = await GetAllTodo(userId);
    res.json(todos);
}


async function PostCreateTodo(req, res) {
    try {
        const { expectedCompletionDate, categoryId, title, description } = req.body;
        
        const userId = getUserByReq(req).id;

        const todo = await CreateTodo({expectedCompletionDate, categoryId, title, description}, userId);

        res.status(201).json(todo);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function GetTodosNotDone(req, res) {

    try {

        const userId = getUserByReq(req).id;

        const todos = await TodosNotDone(userId);
    
        res.json(todos);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function GetLateTodo(req, res) {
    try {
        const userId = getUserByReq(req).id;

        const todos = await LateTodos(userId);
        
        res.json(todos);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
} 

async function UpdateTodoDone(req, res) {
    try {
        const id = parseInt(req.params.id); 
        const userId = getUserByReq(req).id;
        
        const todo = await TodoDone(id, userId);
        res.json(todo);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export { 
    GetTodo,
    PostCreateTodo,
    GetTodosNotDone,
    GetLateTodo,
    UpdateTodoDone
};