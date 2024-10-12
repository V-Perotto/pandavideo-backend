import axios from 'axios';

export default class VideoService {

    async getVideos(data) {

        const response = await axios.get(
            'https://api-v2.pandavideo.com.br/videos//',
            { 
                headers: {
                    'accept': 'application/json',
                    'content-type': 'application/json',
                    'Authorization': process.env.PANDA_API_KEY
                }
            }
        );
        return response.data;
    };

}
