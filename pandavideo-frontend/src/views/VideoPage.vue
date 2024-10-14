<template>
    <div v-if="videos">
        <h1>{{ videos.title }}</h1>
        <h3>{{ videos.description }}</h3>
        <img :src="videos.thumbnail" :alt="videos.thumbnail">
        <iframe :src="videos.video_player" frameborder="0" allowfullscreen></iframe>
        <p>Published on: {{ videos.created_at }}</p>
        <p>Views: {{ videos.views }}</p>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            videos: null,
            params: ''
        };
    },
    name: 'VideoPageComponent',
    async getVideos() {
        const response = await axios.get('http://localhost:3000/videos');
        this.videos = response.data;
    }
}
</script>
