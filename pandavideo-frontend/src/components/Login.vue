// Login.vue
<template>
    <div>
        <h1>Login</h1>
        <form @submit.prevent="handleLogin">
            <input type="email" v-model="email" placeholder="Email" required />
            <input type="password" v-model="password" placeholder="Password" required />
            <button type="submit">Login</button>
            <p v-if="error">{{ error }}</p>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            email: '',
            password: ''
        };
    },
    name: 'LoginComponent',
    methods: {
        async handleLogin() {
            try {
                const response = await axios.post('http://localhost:3000/login', {
                    email: this.email,
                    password: this.password
                });
                const token = response.data.token;
                localStorage.setItem('token', token);
                this.$router.push({ name: 'HomeComponent' });
            } catch (err) {
                this.error = err;
            }
        }
    }
}
</script>
