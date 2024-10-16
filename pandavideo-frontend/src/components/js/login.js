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