<template>
    <div>
        <h1>Sign Up</h1>
        <form @submit.prevent="handleSignup()">
            <input type="email" v-model="email" placeholder="Email" />
            <input type="password" v-model="password" placeholder="Password" />
            <button type="submit">Sign Up</button>
        </form>
        <p v-if="message" style="color: green;">{{ message }}</p>
        <p v-if="error" style="color: red;">{{ error }}</p>
    </div>
</template>

<script>
import signup from './js/signup';

export default {
    name: 'SignUpComponent',
    ...signup,
}
</script>
