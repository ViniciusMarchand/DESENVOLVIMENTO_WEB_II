import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt';

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
})


async function registerPage(req, res) {
    const user = req.session.user;

    res.render('register', user);
};

async function register(req, res) {
    const { name, email, password, role } = req.body;

    const encrypted = bcrypt.hashSync("CHAVE" + password, 10);

    await prisma.user.create({
        data: {
            name,
            email,
            password: encrypted,
            role: role || 'USER',
        },
    });

    res.redirect('/login');
};

export {
    registerPage,
    register
};