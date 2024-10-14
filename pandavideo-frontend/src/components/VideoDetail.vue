<template>
  <div class="video-detail" v-if="video">
    <div class="video-container">
      <video controls :src="video.url" />
    </div>
    <div class="video-info">
      <h2>{{ video.title }}</h2>
      <p>{{ video.description }}</p>
      <div class="video-meta">
        <span>Publicado em: {{ formattedDate }}</span>
        <span>Visualizações: {{ video.views }}</span>
      </div>
    </div>
  </div>
  <div v-else class="loading">
    <p>Carregando vídeo...</p>
  </div>
</template>

<script>
// Importa o serviço para lidar com chamadas de API
import VideoService from '@/services/VideoService';

export default {
  data() {
    return {
      video: null,  // Inicializa o vídeo como null para o estado de carregamento
      params: this.$route.params,  // Obtém o ID do vídeo a partir da rota
    };
  },  
  name: 'VideoDetailComponent',
  computed: {
    // Computa a data de publicação formatada
    formattedDate() {
      if (this.video) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(this.video.published_at).toLocaleDateString(undefined, options);
      }
      return '';
    },
  },
  async mounted() {
    await this.fetchVideoDetails();  // Usa async diretamente no hook de ciclo de vida
  },
  methods: {
    // Método para buscar detalhes do vídeo
    async fetchVideoDetails() {
      try {
        this.video = await VideoService.getVideoDetails(this.params);
      } catch (error) {
        console.error('Erro ao carregar os detalhes do vídeo:', error);
        // Aqui você pode lidar com erros, como redirecionar o usuário ou exibir uma mensagem amigável
      }
    },
  },
};
</script>

<style scoped>
.video-detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.video-container {
  width: 100%;
  max-width: 800px;
}

video {
  width: 100%;
  height: auto;
}

.video-info {
  margin-top: 20px;
}

.video-meta {
  margin-top: 10px;
  font-size: 0.9em;
  color: #666;
}

h2 {
  margin: 10px 0;
}

p {
  font-size: 1.1em;
  line-height: 1.5;
}

.loading {
  text-align: center;
  margin-top: 50px;
  font-size: 1.2em;
  color: #888;
}
</style>
