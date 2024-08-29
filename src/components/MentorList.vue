<script setup lang="ts">
import type { MentorType } from '@/types/MentorType'

defineProps<{
  mentors: MentorType[]
}>()
</script>

<template>
 <h1></h1>
</template>

<style>
.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 250px;
  height: 150px;
  padding: 20px;
  margin: 10px;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 12px;
  background-color: #fff;
}

.card h2 {
  margin: 0;
}
</style>
