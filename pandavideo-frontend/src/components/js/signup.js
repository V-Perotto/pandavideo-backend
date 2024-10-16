import axios from 'axios';

export default {
    data() {
        return {
            email: '',
            password: '',
            error: '',
            message: ''
        };
    },
    name: 'SignupComponent',
    methods: {
        async handleSignup() {
            try {
                const response = await axios.post('http://localhost:3000/signup', {
                    email: this.email,
                    password: this.password
                });
                if (response.status === 201) {
                    localStorage.setItem('token', response.data.message);
                    this.message = response.data.status
                    this.error = '';
                    this.$router.push('/');
                } else {
                    this.error = response.data.message;
                    this.message = '';
                }
                // this.$router.push({ name: 'HomeComponent' });
            } catch (err) {
                this.error = err.message || 'sErro ao criar conta';
                this.message = '';
            }
        }
    }
}