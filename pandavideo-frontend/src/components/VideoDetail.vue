<template>
  <div class="video-detail" v-if="video">
    <div class="video-container">
      <video controls :src="video.video_player" />
    </div>
    <div class="video-info">
      <p>{{ video }}</p>
      <h2>{{ video.title }}</h2>
      <p>{{ video.description }}</p>
      <div class="video-meta">
        <span>Publicado em: {{ formattedDate(video) }}</span>
        <span>Qualidades de Vídeo disponíveis: {{ video.playback }}</span>
      </div>
    </div>
  </div>
  <div v-else class="loading">
    <p>Carregando vídeo...</p>
  </div>
</template>

<script>
import videodetail from './js/videodetail';

export default {
  name: 'VideoDetailComponent',
  ...videodetail,
}
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
  color: #777;
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
