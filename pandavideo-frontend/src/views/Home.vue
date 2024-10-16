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
                page: 1,
                limit: 10
            }
        };
    },
    mounted() {
      let pandaPlayerScript = document.createElement('script')
      pandaPlayerScript.setAttribute('src', 'https://player.pandavideo.com.br/api.v2.js')
      document.head.appendChild(pandaPlayerScript)
    },
    computed: {
      filteredVideos() {
        const search = this.search.trim().toLowerCase();
        if (this.videos.length > 0) {
          return this.videos.filter(video => {
              return video.title && video.title.toLowerCase().includes(search);
          });
        }
        return this.videos;
      }
    },
    async created() {
      try {
        const queryString = new URLSearchParams(this.params).toString();
        const response = await axios.get(`http://localhost:3000/videos?${queryString}`, 
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
