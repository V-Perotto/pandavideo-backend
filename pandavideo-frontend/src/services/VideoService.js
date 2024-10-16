import axios from 'axios';

const API_URL = 'http://localhost:3000';

export default {

  async getVideoDetails(id) {
    try {
      const response = await axios.get(`${API_URL}/video/${id}`, {headers: {
        'Bearer': localStorage.getItem('token'),
        'Content-Type': 'application/json'
        } 
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar os detalhes do vídeo:', error);
      throw error;
    }
  },

  async getVideos(params) {
    try {
      const response = await axios.get(`${API_URL}/videos?${params}`, {headers: {
        'Bearer': localStorage.getItem('token'),
        'Content-Type': 'application/json'
        } 
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar o(s) vídeo(s):', params);
      throw error;
    }
  }
}
