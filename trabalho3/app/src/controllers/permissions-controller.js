import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

async function permissions(req, res) {

    const users = await prisma.user.findMany({
        where: {
            //como os admin e os superusers tem direito a todas as páginas, só é relavente congiruar as permissões dos usuários comuns
            role: 'USER'
        },
        include: {
            profilePhoto: true,
            permissions: {
                include: {
                    module: true
                }
            }
        }
    });      

    const usuariosFormatados = users.map(user => {
        return {
            ...user,
            financeiro: user.permissions.find(permission => permission.moduleId === 1)?.permission || false,
            relatorios: user.permissions.find(permission => permission.moduleId === 2)?.permission || false,
            produtos: user.permissions.find(permission => permission.moduleId === 3)?.permission || false
        };
    });

    res.render('permissions', { users: usuariosFormatados});
};

async function atualizarPermissoes(req, res) {
    const { financeiro, produtos, relatorios} = req.body;
    let userId = parseInt(req.body.userId);

    await prisma.permission.upsert({
        where: {
            moduleId_userId: {
                userId: userId,
                moduleId: 1
            }
        },
        update: {
            permission: financeiro
        },
        create: {
            name: 'ACCESS',
            moduleId: 1,
            permission: financeiro,
            userId
        }
    });


    await prisma.permission.upsert({
        where: {
            moduleId_userId: {
                userId: userId,
                moduleId: 2
            }
        },
        update: {
            permission: relatorios
        },
        create: {
            name: 'ACCESS',
            moduleId: 2,
            permission: relatorios,
            userId
        }
    });

    await prisma.permission.upsert({
        where: {
            moduleId_userId: {
                userId: userId,
                moduleId: 3
            }
        },
        update: {
            permission: produtos
        },
        create: {
            name: 'ACCESS',
            moduleId: 3,
            permission: produtos,
            userId
        }
    });
    
}



export {
    permissions,
    atualizarPermissoes
};