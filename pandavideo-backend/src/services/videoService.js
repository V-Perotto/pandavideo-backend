import axios from 'axios';

export default class VideoService {

    headers = {
        'accept': 'application/json',
        'content-type': 'application/json',
        'Authorization': process.env.PANDA_API_KEY
    }
    
        async getVideos(data) {
            const queryString = new URLSearchParams(data).toString();
        const response = await axios.get(
            `https://api-v2.pandavideo.com.br/videos/?${queryString}`,
            { headers: this.headers }
        );
        return response.data;
    };

    async getVideoDetails(data) {   
        const response = await axios.get(
            `https://api-v2.pandavideo.com.br/videos/${data}`,
            { headers: this.headers }
        );
        return response.data;
    };

}
