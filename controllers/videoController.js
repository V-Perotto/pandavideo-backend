const videoService = require('../services/videoService');

exports.getVideos = async (req, res) => {
  try {
    const filters = req.query;
    const videos = await videoService.getVideos(filters);
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json(
        { message: 'Error fetching videos', error }
    );
  }
};
