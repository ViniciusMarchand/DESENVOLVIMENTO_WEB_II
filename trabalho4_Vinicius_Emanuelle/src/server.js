

import dotenv from 'dotenv';
dotenv.config();


import { PrismaClient } from '@prisma/client'

import swaggerJSDoc from'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express'

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
})

import express, { query } from 'express';

import swaggerDocument from './swagger.json' assert { type: 'json' };
import router from './routes/index.js';

const app = express();
 


// const swaggerSpec = swaggerJSDoc(swaggerDocument);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json()); // trabalhando com apis
app.use(express.urlencoded({
    extended: false
})); // Server side rendering e sistemas web em geral

import cors from 'cors';
app.use(cors());


app.get('/healthcheck', (req, res) => {
    res.send('OK');
});


app.use('/', router)

app.use((req, res, next) => {
    res.status(404).json({ error: 'Not found' });
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
});


app.listen(3000, () => console.log("Server iniciou na porta 3000"));
