// npm init --yes
// "start": "node --watch src/server.js"
// npm run start        inicia a aplicacao rodando o comando start
// npm i express        instalo o express
// npm i                instala todas as dependencias
//  "type": "module",   no package.json para forcar o projeto para um modulo js

// const express = require('express');

import dotenv from 'dotenv';
const NODE_ENV = process.env.NODE_ENV;

if (NODE_ENV === 'development') {
    console.log("Running in development mode");
    dotenv.config({ path: '.env.development' });
} else if (NODE_ENV === 'production') {
    console.log("Running in production mode");
    dotenv.config({ path: '.env.production' });
}

console.log({
    ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    APP_SECRET: process.env.APP_SECRET,
    HASH_SECRET: process.env.HASH_SECRET,
})

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
})

import express, { query } from 'express';

import session  from 'express-session';

import bcrypt from 'bcrypt';
import { isAuth } from './middlewares/is-auth.js';
import { isAdmin } from './middlewares/is-admin.js';

import multer from 'multer';

import router from './routes/index.js';
const upload = multer({ dest: 'uploads/' })


const app = express();

app.use(express.static('uploads')); // torna a pasta de uploads estatica

app.use(express.json()); // trabalhando com apis
app.use(express.urlencoded({
    extended: false
})); // Server side rendering e sistemas web em geral

// numa aplicacao real, o storage deve ser externo (ex: redis)
// as sessions ocupam espaço na memoria do servidor
app.use(session({
    secret: 'keyboard cat', // deve ser transformado em uma variavel de ambiente
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// SALVAR TODAS AS ROTAS QUE O USUARIO ESTA ACESSANDO NA SESSAO
app.use((req, res, next) => {
    req.session.routes = req.session.routes ?? [];
    req.session.routes.push(req.url);
    next();
});

//criar superusuario ao iniciar a aplicacao e módulos
app.use(async (req, res, next) => {
    const user = await prisma.user.findFirst({
        where: {
            email: 'admin@gmail.com'
        },
    });
    if (!user) {
        await prisma.user.create({
            data: {
                name: 'admin',
                email: 'admin@gmail.com',
                password: bcrypt.hashSync('CHAVEadmin', 10),
                role: 'SUPERUSER',
            },
        });
    }

    //criar módulos
    const modules = await prisma.module.findMany();
    if (modules.length === 0) {
        await prisma.module.createMany({
            data: [
                { name: 'financeiro' },
                { name: 'relatorios' },
                { name: 'produtos' },
            ],
        });
    }
    
    next();
});

// meu MIDDLEWARE
app.use(async (req, res, next) => {
    if (NODE_ENV == 'production') return next();
    console.log('Middleware');
    console.log({
        url: req.url,
        method: req.method,
        body: req.body,
        query: req.query,
        sessionId: req.sessionID,
        session: req.session,
    })

    if(req.session.user?.userId) {
        await prisma.routeHistory.create({
            data: {
                route: req.url,
                userId: req.session.user?.userId,
            }
        });
    }
    next();
});


app.set('view engine', 'ejs');  // seta a template engine
app.set('views', 'src/views');  // seta a pasta de views

app.get('/healthcheck', (req, res) => {
    res.send('OK');
});

app.get('/', (req, res) => res.redirect('/home'));

app.use("/", router);

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
}); 

// ROTA PARA BUSCAR A PAGINA DE LOGIN
app.get('/login', (req, res) => {
    res.render('login');
});

/*
    req.body => corpo da requisicao
    req.params => parametros da requisicao (ex: /users/:id vinculado a URL)
    req.query => query params (ex: /users?name=vinicius)
*/
// ROTA PARA A AÇÃO DE LOGIN
app.post('/login', async (req, res) => {
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
});

// importar as rotas de usuario e adicionar ao meu app
// import usersRouter from './routes/users-routes.js';
// app.use('/users', usersRouter);


// opcao 1 = criar uma rota que entrega um arquivo estatico
// opcao 2 = tornar toda pasta de uploads estatica

app.listen(3000, () => console.log("Server iniciou na porta 3000"));
