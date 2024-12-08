import { Router } from 'express';

import { isAuth } from '../middlewares/is-auth.js';
import { mudarFotoPerfil } from '../controllers/profilePhotoController.js';
import multer from 'multer';


import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
})

const router = Router();
const upload = multer({ dest: 'uploads/' })


router.post('/mudar-foto-perfil', isAuth, upload.single('foto'), async (req, res) => {
    console.log("req.file", req.session.user);

    const user = await prisma.user.findUnique({
        where: {
            email: req.session.user.email,
        },
    });

    const profilePhoto = await prisma.profilePhoto.findFirst({
        where: {
            userId: user.id,
        },
    });

    if (profilePhoto) {
        await prisma.profilePhoto.update({
            where: {
                id: profilePhoto.id,
            },
            data: {
                url: req.file.filename,
            },
        });
        return res.send('OK');
    } else {
        await prisma.profilePhoto.create({
            data: {
                url: req.file.filename,
                userId: user.id,
            },
        });
    }

   

    res.send('OK');
});


export default router;