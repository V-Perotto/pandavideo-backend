import axios from 'axios';

const API_URL = 'http://localhost:3000/videos';

export default {
  async getVideoDetails(params) {
    try {
      const response = await axios.get(`${API_URL}/${params}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar os detalhes do vídeo:', error);
      throw error;
    }
  },
};
