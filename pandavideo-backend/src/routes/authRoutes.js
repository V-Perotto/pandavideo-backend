import { Router } from 'express';
import AuthController from '../controllers/authController.js';

const router = Router();

router.post('/signup', new AuthController().createAccount);
router.post('/login', new AuthController().loginAccount);
router.get('/users', new AuthController().getUsers);

export default router;