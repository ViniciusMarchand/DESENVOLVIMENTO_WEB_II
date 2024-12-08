
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

const hasAccessFinanceiro = async (req, res, next) => {
    if (req.session.user === undefined) {
        return res.redirect('/error-forbidden'); 
    }

    if (req.session.user.role === "ADMIN" || req.session.user.role === "SUPERUSER") {
        return next();
    }
    
    const userId = req.session.user.userId;

    const permission = await prisma.permission.findFirst({
        where: {
            userId: userId,
            moduleId: 1,
        },
    });

    if (!permission || !permission.permission) { 
        return res.redirect('/error-forbidden');
    }

    next();
}

export default hasAccessFinanceiro ;