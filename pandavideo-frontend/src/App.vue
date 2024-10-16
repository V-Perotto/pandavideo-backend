<template>
  <div id="app">
    <header>
      <nav>
        <ul v-if="isLoggedIn">
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/videos">Video List</router-link></li>
        </ul>
        <ul v-else>
          <li><router-link to="/login">Login</router-link></li>
          <li><router-link to="/signup">Sign Up</router-link></li>
        </ul>
      </nav>
    </header>

    <router-view></router-view>
  </div>
</template>


<script>
export default {
  name: 'App',
  data() {
    return {
      isLoggedIn: false,
    };
  },
  created() {
    this.checkLoginStatus();
  },
  methods: {
    checkLoginStatus() {
      this.isLoggedIn = !!localStorage.getItem('token');
    },
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
