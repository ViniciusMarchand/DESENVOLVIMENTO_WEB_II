import { prisma } from "../config/dbconnection.js";
import { createTodo, getAllTodo, lateTodos, todoDone, todosNotDone } from "../repository/todo-repository.js";


async function GetAllTodo(userId) {
    const todos = getAllTodo(userId);
    return todos;
}

async function CreateTodo(todo, userId) {
    const newTodo = await createTodo(todo, userId);
    return newTodo;
}

async function TodosNotDone(userId) {
    const todos = await todosNotDone(userId);
    return todos;
}

async function LateTodos(userId) {
    const todos = await lateTodos(userId);
    return todos;
}

async function TodoDone(id, userId) {
    const todo = await todoDone(id, userId);
    return todo;
} 

export {
    TodosNotDone,
    LateTodos,
    TodoDone,
    CreateTodo,
    GetAllTodo
}