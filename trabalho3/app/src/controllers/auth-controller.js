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


function logout(req, res) {
    req.session.destroy();
    res.redirect('/');
}

function loginPage(req, res) {
    res.render('login');
}

async function login(req, res) {
    const { email, password } = req.body;
    console.log({ email, password });

    // retorna 1 objeto ou null
    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });

    if (!user) {
        // return res.status(400).json({ error: 'invalid credentials' });
        return res.status(404).json({ error: 'User not found' });
    }

    const isValid = bcrypt.compareSync("CHAVE"+ password, user.password);
    if (!isValid) {
        return res.status(400).json({ error: 'invalid credentials' });
    }
    
    const userSession = {
        userId: user.id,
        email: user.email,
        role: user.role,
    };
    req.session.user = userSession
    // res.json({ user });
    res.redirect('/home');
}

export {
    registerPage,
    register,
    logout,
    loginPage,
    login
};