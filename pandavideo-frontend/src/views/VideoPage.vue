<template>
    <div v-if="videos">
        <div v-for="video in videos" v-bind:key="video.id">
            <h1>{{ video.title }}</h1>
            <h3>{{ video.description }}</h3>
            <img :src="video.thumbnail" :alt="video.thumbnail">
            <iframe :src="video.video_player" frameborder="0" allowfullscreen></iframe>
            <p>Published on: {{ video.created_at }}</p>
            <p>Status: {{ video.status }}</p>
        </div>
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
    async created() {
        try {
            const response = await axios.get('http://localhost:3000/videos',
                { headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'Bearer': localStorage.getItem("token")
                } 
            }
            );
            this.videos = response.data;
        } catch(error) {
            console.error(`Erro no Created(): ${error}`)
        }
    }
}
</script>
