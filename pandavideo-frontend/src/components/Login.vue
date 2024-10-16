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
import login from './js/login';

export default {
    name: 'LoginComponent',
    ...login,
}
</script>
