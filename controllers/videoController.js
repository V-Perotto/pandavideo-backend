import VideoService from '../services/videoService.js';

export default class VideoController {

    async getVideos(req, res, next) {
        try {
            const videos = await VideoService.getVideos(req.body);
            res.status(200).json(videos);
        } catch (error) {
            return next(new ErrorHandler(500, "Erro ao buscar o(s) vídeo(s)."));
        }
    };

}


