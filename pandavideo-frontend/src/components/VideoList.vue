<template>
    <div>
        <div v-for="video in videos.videos" :key="video.id">
            <img :src="video.thumbnail" alt="Video Thumbnail" width="500px" height="380px" />
            <h3>{{ video.title }}</h3>
            <p>{{ video.description }}</p>
            <router-link :to="`/video/${video.id}`">Watch Video</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'VideoListComponent',
    props: {
        videos: Array[Object]
    }
}
</script>
