<template>
    <div>
        <h1>Videos</h1>
        <input type="text" v-model="search" placeholder="Search videos..." />
        <VideoList :videos="filteredVideos" />
    </div>
</template>

<script>
import VideoList from '../components/VideoList.vue';
import axios from 'axios';

export default {
    name: 'HomeComponent',
    components: { VideoList },
    data() {
        return {
            videos: [],
            search: '',
            params: {
                page: 0,
                limit: 1,
                title: '',
                status: ''
            }
        };
    },
    computed: {
        filteredVideos() {
            return this.videos.filter(video =>
                video.title.toLowerCase().includes(this.search.toLowerCase())
            );
        }
    },
    async getVideos() {
        const response = await axios.get('http://localhost:3000/videos', this.params);
        this.videos = response.data;
    }
}
</script>
