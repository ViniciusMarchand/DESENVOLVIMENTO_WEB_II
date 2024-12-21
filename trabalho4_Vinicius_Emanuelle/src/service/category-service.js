import { categoriesWithTodos, listCategories, shareCategory, sharedCategories } from "../repository/category-repository.js";


async function ListCategories(userId) {
    const categories = await listCategories(userId);

    return categories;
}

async function paginatedCategories(page, userId) {
    const result = await categoriesWithTodos(page, userId);

    return result;
}

async function ShareCategory(categoryId, ownerId, userId) {

    categoryId = parseInt(categoryId);
    ownerId = parseInt(ownerId);
    userId = parseInt(userId);
    
    const relation = await shareCategory(categoryId, ownerId, userId);
    return relation;
}

async function SharedCategories(userId) {
    userId = parseInt(userId);
    const categories = await sharedCategories(userId);
    return categories;
}

export { 
    paginatedCategories,
    ListCategories,
    ShareCategory,
    SharedCategories
 };