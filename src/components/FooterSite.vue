<script setup lang="ts">
import router from '@/router'

const logout = () => {
  sessionStorage.removeItem('token')
  window.location.reload()
  // Redireciona para a página de login
  router.push('/login')
}
</script>

<template>
  <footer>
    <v-btn class="logout-btn" color="red" icon="mdi-logout" @click="logout"></v-btn>
  </footer>
</template>

<style scoped>
.logout-btn {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
}
</style>s
