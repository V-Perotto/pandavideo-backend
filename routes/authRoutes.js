import { Router } from 'express';
import AuthController from '../controllers/authController.js';

const router = Router();

router.post('/signup', (req, res, next) => new AuthController().createAccount(req, res, next));
router.post('/login', (req, res, next) => new AuthController().loginAccount(req, res, next));
router.get('/users', (req, res, next) => new AuthController().getUsers(req, res, next));

export default router;