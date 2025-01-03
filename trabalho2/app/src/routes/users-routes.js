// import com {} importa apenas o Router de dentro do express
import { Router } from 'express';
import { listaUsers, paginaAddUser, addUser, paginaUpdateUser, updateUser, deleteUser, paginaDetailsUser } from '../controllers/users-controller.js';

const router = Router();

// pagina lista os usuarios
// router.get('/', (req, res) => {
//     return listaUsers(req, res);
// });
router.get('/addUser', paginaAddUser);


router.get('/users', listaUsers);

// router.get('/:id', detalhaUser);


router.post('/add', addUser);

router.get('/updateUser/:id', paginaUpdateUser); 
router.post('/updateUser/:id', updateUser); 
router.delete('/deleteUser/:id', deleteUser);
router.get('/users/:id', paginaDetailsUser);
export default router;