import { prisma } from "../config/dbconnection.js";


async function listCategories(userId) {
    const categories = await prisma.category.findMany({
        where: {
            userId: userId
        },
        orderBy: {
            name: 'asc'
        }
    });

    return categories;
}



async function categoriesWithTodos(page = 1, userId) {
    const pageSize = 5;

    const skip = (page - 1) * pageSize;

    const categories = await prisma.category.findMany({
        skip: skip,
        take: pageSize,
        include: {
            todos: true
        },
        orderBy: {
            name: 'asc'
        },
        where: {
            userId: userId
        }
    });

    const totalCategories = await prisma.category.count({
        where: {
            userId: userId
        }
    });

    return {
        data: categories,
        currentPage: page,
        pageSize: pageSize,
        totalRecords: totalCategories,
        totalPages: Math.ceil(totalCategories / pageSize)
    };
}


async function shareCategory(categoryId, ownerId, userId) {

    const category = await prisma.category.findFirst({
        where: {
            id: categoryId,
        }
    });
    
    if (!category) {
        throw new Error('Category not found');
    }

    if(category.userId !== ownerId) {
        throw new Error('Unauthorized');
    }

    const relation = await prisma.sharedCategory.create({
        data: {
            categoryId: categoryId,
            userId: userId
        }
    });

    return relation;

}

async function sharedCategories(userId) {

    const categories = await prisma.sharedCategory.findMany({
        where: {
            userId: userId
        },
        include: {
            category: {
                include: {
                    todos: true
                }
            }
            
        }
    });

    

    return categories.map(item => item.category);
}


export { 
    categoriesWithTodos,
    listCategories,
    shareCategory,
    sharedCategories
};
