import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import VideoPage from '../views/VideoPage.vue';
import VideoDetail from '@/components/VideoDetail.vue';
import Login from '../components/Login.vue';
import Signup from '../components/Signup.vue';

const routes = [
    { path: '/', name: 'HomeComponent', component: Home },
    { path: '/videos', name: 'VideoPageComponent', component: VideoPage },
    { path: '/login', name: 'LoginComponent', component: Login },
    { path: '/signup', name: 'SignupComponent', component: Signup },
    { path: '/video/:id', name: 'VideoDetailsComponent', component: VideoDetail },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('token');
    
    if (!isAuthenticated && to.name !== 'LoginComponent' && to.name !== 'SignupComponent') {
        next({ name: 'LoginComponent' }); 
    } else if (isAuthenticated && (to.name === 'LoginComponent' || to.name === 'SignupComponent')) {
        next({ name: 'HomeComponent' });
    } else {
        next();
    }
});

  
export default router;
