import VideoService from '../services/videoService.js';
import ErrorHandler from '../utils/errorHandler.js';

export default class VideoController {

    async getVideos(req, res, next) {
        try {
            const videoService = new VideoService();
            const videos = await videoService.getVideos(req.query);
            res.status(200).json(videos);
        } catch (error) {
            return next(new ErrorHandler(500, "Erro ao buscar o(s) vídeo(s)."));
        }
    };

}


