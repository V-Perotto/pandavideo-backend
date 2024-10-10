import { Router } from 'express';
import getVideos from '../controllers/videoController.js';
import protect from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/videos', protect, getVideos);

export default router;