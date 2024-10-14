import { Router } from 'express';
import VideoController from '../controllers/videoController.js';
import AuthMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/videos', 
    new AuthMiddleware().protect, 
    new VideoController().getVideos);

export default router;