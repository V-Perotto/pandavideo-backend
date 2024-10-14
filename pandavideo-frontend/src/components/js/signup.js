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
                    const token = response.data;
                    localStorage.setItem('token', token);
                    this.message = 'Conta criada!'
                    this.error = '';
                    this.$router.push('/');
                } else {
                    this.error = response.data;
                    this.message = '';
                }
                // this.$router.push({ name: 'HomeComponent' });
            } catch (err) {
                this.error = err.message || 'Erro ao criar conta';
                this.message = '';
            }
        }
    }
}