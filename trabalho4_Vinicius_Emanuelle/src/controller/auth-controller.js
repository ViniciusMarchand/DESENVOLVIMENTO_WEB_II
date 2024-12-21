import jsonwebtoken from 'jsonwebtoken';
import { prisma } from '../config/dbconnection.js';
import bcrypt from 'bcrypt';
import { sendVerificationEmail } from '../service/send-email-service.js';

async function login(req, res) {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    const isValid = bcrypt.compareSync("CHAVE"+ password, user.password);
    if (!isValid) {
        return res.status(400).json({ error: 'invalid credentials' });
    }
    
    const jwt = jsonwebtoken.sign(user, process.env.APP_SECRET, { expiresIn: '1d' });

    return res.json(jwt);
}

async function register(req, res) {
    const { name, email, password } = req.body;
    
    try {
        const encrypted = bcrypt.hashSync("CHAVE" + password, 10);
        
        await prisma.user.create({
            data: {
                name,
                email,
                password: encrypted,
            },
        });
    
        const token = jsonwebtoken.sign({ email }, process.env.APP_SECRET, { expiresIn: '1d' });
    
        sendVerificationEmail(email, token);
        
        res.status(201).send("Verifique seu email");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


async function validateEmail(req, res) {
    const { token } = req.params;
    console.log({ token });

    const { email } = jsonwebtoken.verify(token, process.env.APP_SECRET);
    console.log({ email });

    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    await prisma.user.update({
        where: {
            email: email,
        },
        data: {
            valid: true,
        },
    });

    return res.json({ message: 'Email validated' });
}

export {
    login,
    register,
    validateEmail
}



