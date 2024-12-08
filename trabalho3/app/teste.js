import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
})

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

//craiar permissao
// await prisma.permission.create({
//     data: {
//         userId: 3,
//         name: 'ACCESS',
//         moduleId: 1
//     }
// });



console.log(users);
console.log(users[1].permissions.module.name);