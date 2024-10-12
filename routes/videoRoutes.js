import { Router } from 'express';
import VideoController from '../controllers/videoController.js';
import AuthMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/videos', 
    (req, res, next) => new AuthMiddleware().protect(req, res, next), 
    (req, res, next) => new VideoController().getVideos(req, res, next));

export default router;