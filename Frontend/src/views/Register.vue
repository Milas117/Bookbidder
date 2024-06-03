<template>
  <div class="auth-container">
    <h1>Register for BookBidder</h1>
    <form @submit.prevent="handleRegister">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="name" required />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      <button type="submit" class="auth-button">Register</button>
    </form>
    <p>Already have an account? <router-link to="/login">Sign in here</router-link>.</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { registerUser } from '../../service/index.js'; 

const name = ref('')
const email = ref('')
const password = ref('')
const errorMessage = ref('')

const validatePassword = (password) => {
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  return password.length >= 5 && hasLetter && hasNumber;
}

const validateEmail = (email) => {
  return email.includes('@');
}

const handleRegister = async () => {
  if (!validateEmail(email.value)) {
    errorMessage.value = 'Please enter valid email address';
    return;
  }

  if (!validatePassword(password.value)) {
    errorMessage.value = 'Password must be at least 5 characters long and contain at least one letter and one number';
    return;
  }

  try {
    const response = await registerUser(name.value, email.value, password.value);
    console.log('Registration successful:', response);
  } catch (error) {
    console.error('Registration failed:', error.message);
    errorMessage.value = error.message;
  }
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
