<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <header>
    <div class="ma-5">
      <p>Menu MentorsMenager</p>
    </div>
    <div>
      <nav class="d-flex flex-column">
        <RouterLink to="/home">Home</RouterLink>
        <RouterLink to="/">login</RouterLink>
        <RouterLink to="/register">register</RouterLink>
      </nav>
    </div>
  </header>
</template>
