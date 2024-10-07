const express = require('express');
const { getVideos } = require('../controllers/videoController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/videos', protect, getVideos);

module.exports = router;
