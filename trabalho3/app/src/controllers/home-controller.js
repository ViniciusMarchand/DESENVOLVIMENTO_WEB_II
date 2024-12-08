import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
})

async function home(req, res) {

    const users = await prisma.user.findMany({
        include: {
            profilePhoto: true,
            permissions: {
                include: {
                    module: true
                }
            }


        }
    });

    res.render('home', { user: req.session.user, users });
};

export {
    home
};