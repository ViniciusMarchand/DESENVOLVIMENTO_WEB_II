
import { PrismaClient } from '@prisma/client'
import multer from 'multer';


const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
})

const upload = multer({ dest: 'uploads/' })

async function mudarFotoPerfil(req, res) {
    
    return upload.single('foto'), async (req, res) => {
        console.log(req.file);
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
    };
    
}

export {
    mudarFotoPerfil,
};