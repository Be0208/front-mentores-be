<script setup lang="ts">
import { createAccount } from '@/services/apiMentors'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const name = ref<string>('')
const email = ref<string>('')
const password = ref<string>('')
const role = ref<string>('')
const router = useRouter()

const handleLogin = async () => {
  const response = await createAccount(name.value, email.value, password.value, role.value)
  if (response) {
    router.push('/')
  }
}
</script>

<template>
  <div class="background1">
    <div class="container1">
      <div class="form-section1">
        <div class="logo">
          <h2>Registrar Usuario no MentorsGerencer</h2>
        </div>
        <div class="form">
          <label>Nome:</label>
          <input class="form-input" v-model="name" type="text" />

          <label>E-mail:</label>
          <input class="form-input" v-model="email" type="text" />

          <label>Password:</label>
          <input class="form-input" v-model="password" type="password" />

          <label>Confirmar Cargo:</label>
          <input class="form-input" v-model="role" type="text" />

          <button class="btn" v-on:click="handleLogin">Registrar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.background1 {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
}

.container1 {
  display: flex;
  width: 50%;
  height: 70%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  background-color: white;
}

.form-section1 {
  width: 100%;
  padding: 1rem;
}
.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.logo {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.logo img {
  width: 70%;
}

.btn {
  padding: 10px;
  background-color: #4285f4;
  border: none;
  color: white;
  border-radius: 21px;
  cursor: pointer;
}
.btn:hover {
  background-color: #357ae8;
}

.form-input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
