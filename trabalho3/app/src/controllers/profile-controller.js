import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
})

async function profilePage(req, res) {
    const { user } = req.session
    
        const userData = await prisma.user.findUnique({
            where: {
                email: user.email,
            },
            include: {
                profilePhoto: true,
                
            }
        });
        console.warn({userData});
        res.render('perfil', { user: userData });
};

export {
    profilePage
};