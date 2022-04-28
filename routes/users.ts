import { Router } from 'express';
import { createUser, deleteUser, getUsers, putUser, getUser } from '../controllers/users';

const router = Router();

// routes for controllers
router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.put('/:id', putUser);
router.delete('/:id', deleteUser);

export default router;