<template>
  <div class="auth-container" v-if="!isUserLoggedIn">
    <h1>Sign In to BookBidder</h1>
    <form @submit.prevent="signIn">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      <button type="submit" class="auth-button">Sign In</button>
    </form>
    <p>Don't have an account? <router-link to="/register">Register here</router-link>.</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { handleSignIn as signInService } from '../../service/index.js'; 

const router = useRouter();
const store = useStore();

const email = ref('');
const password = ref('');
const errorMessage = ref('');

const isUserLoggedIn = computed(() => !!store.getters.user);

const signIn = async () => {
  errorMessage.value = ''; 
  try {
    const response = await signInService(email.value, password.value);
    console.log('Sign in successful:', response);
    window.location.reload();
    router.push('/');
  } catch (error) {
    console.error('Sign in failed:', error.message);
    errorMessage.value = 'Invalid email or password. Please try again.';
  }
};

if (isUserLoggedIn.value) {
  router.push('/'); 
}
</script>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 2em auto;
  padding: 2em;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}
.form-group {
  margin-bottom: 1em;
}
label {
  display: block;
  margin-bottom: 0.5em;
}
input {
  width: 100%;
  padding: 0.5em;
  margin-bottom: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.auth-button {
  padding: 0.5em 1em;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.auth-button:hover {
  background-color: #45a049;
}
.error-message {
  color: red;
  margin-bottom: 1em;
}
</style>
