// import com {} importa apenas o Router de dentro do express
import { Router } from 'express';
import { listaUsers, paginaAddUser, addUser, detalhaUser, paginaUpdateUser, updateUser } from '../controllers/users-controller.js';

const router = Router();

// pagina lista os usuarios
// router.get('/', (req, res) => {
//     return listaUsers(req, res);
// });

router.get('/', listaUsers);

// router.get('/:id', detalhaUser);

router.get('/addUsers', paginaAddUser);

router.post('/add', addUser);

router.get('/updateUser/:id', paginaUpdateUser); 
router.post('/updateUser/:id', updateUser); 

export default router;