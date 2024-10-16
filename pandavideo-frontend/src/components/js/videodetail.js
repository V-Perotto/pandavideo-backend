import axios from 'axios';

export default {
  data() {
    return {
      video: null
    };
  },  
  name: 'VideoDetailComponent',
  computed: {
    formattedDate() {
      if (this.video) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(this.video.published_at).toLocaleDateString(undefined, options);
      }
      return '';
    },
  },
  async mounted() {
    await this.fetchVideoDetails();  
  },
  methods: {
    async fetchVideoDetails() {
      try {
        const response = await axios.get(`http://localhost:3000/video/${this.video.id}`, 
            { headers: {
              'accept': 'application/json',
              'Content-Type': 'application/json',
              'Bearer': localStorage.getItem("token")
              } 
            });
        this.video = response.data;
      } catch (error) {
        console.error('Erro ao carregar os detalhes do vídeo:', error);
      }
    },
  },
};