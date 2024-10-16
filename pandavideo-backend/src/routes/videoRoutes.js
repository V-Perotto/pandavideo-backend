import { Router } from 'express';
import VideoController from '../controllers/videoController.js';
import AuthMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/videos', 
    new AuthMiddleware().protect, 
    new VideoController().getVideos
);

router.get('/video/:id',
    new AuthMiddleware().protect,
    new VideoController().getVideoDetails
)

export default router;