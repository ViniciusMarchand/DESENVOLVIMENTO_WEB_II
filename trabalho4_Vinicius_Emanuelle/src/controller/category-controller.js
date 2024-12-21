import { prisma } from "../config/dbconnection.js";
import { ListCategories, paginatedCategories, ShareCategory, SharedCategories } from "../service/category-service.js";
import { getUserByReq } from "../utils/index.js";

async function GetCategoryList(req, res) {
    try {
        
        const userId = getUserByReq(req).id;
        const categories = await ListCategories(userId);
    
        res.json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function CreateCategory(req, res) {
    try {
        const userIdToken = getUserByReq(req).id;
        const { userId } = req.body;

        if(userId !== userIdToken) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const { name } = req.body;


        const category = await prisma.category.create({
            data: {
                name: name,
                userId: userId
            }
        });
        res.status(201).json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function GetCategoriesWithTodos(req, res) {
    try {
        const { page } = req.params;

        const userId = getUserByReq(req).id;

        const pagination = await paginatedCategories(page, userId)
        res.json(pagination);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function GetShareCategory(req, res) {

    try {
        const { categoryId, userId } = req.params;
        const ownerId = getUserByReq(req).id;

        const relation = await ShareCategory(categoryId, ownerId, userId);
        res.status(201).json(relation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function GetSharedCategories(req, res) {
    try {
        const userId = getUserByReq(req).id;

        const categories = await SharedCategories(userId);
        res.json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


export { 
    GetCategoryList,
    CreateCategory,
    GetCategoriesWithTodos,
    GetShareCategory,
    GetSharedCategories
};