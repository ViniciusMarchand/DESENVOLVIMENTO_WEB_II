import { prisma } from "../config/dbconnection.js";


async function getAllTodo(userId) {

    const todos = await prisma.todo.findMany({
        where: {
            category: {
                userId: userId
            }
        }
    });
    return todos;
}

async function createTodo(todo, userId) {
    const { expectedCompletionDate, categoryId, title, description } = todo;


    const category = await prisma.category.findFirst({
        where: {
            id: categoryId,
        }
    });

    if(category.userId !== userId) {
        throw new Error('Unauthorized');
    }

    const newTodo = await prisma.todo.create({
        data: {
            expectedCompletionDate,
            categoryId,
            title,
            description,
        },
    });

    return newTodo;

}

async function todosNotDone(userId) {
    const todos = await prisma.todo.findMany({
        where: {
            category: {
                userId: userId
            },
            done: false
        }
    });

    return todos;
}

async function lateTodos(userId) {

    
    const todos = await prisma.todo.findMany({
        where: {
            expectedCompletionDate: {
                lt: new Date()
            },
            category: {
                userId: userId
            },
            done: false
        }
    });

    return todos;
}

async function todoDone(id, userId) {

    const auxTodo = await prisma.todo.findFirst({
        where: {
            id: id
        }
    });

    const category = await prisma.category.findFirst({
        where: {
            id: auxTodo.categoryId
        }
    });
    
    if(category.userId !== userId) {
        throw new Error('Unauthorized');
    }

    const todo = await prisma.todo.update({
        where: {
            id
        },
        data: {
            done: true
        }
    });

    return todo;
}

export {
    todosNotDone,
    lateTodos,
    todoDone,
    createTodo,
    getAllTodo

}