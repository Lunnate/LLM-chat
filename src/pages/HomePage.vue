<script setup lang="ts">
import AppTextarea from "../components/AppTextarea.vue";
</script>

<template>
  <div class="m-auto">
    <div class="mb-4">
      <h1
        class="text-2xl p-4 text-center font-bold from-blue-300 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent"
      >
        Чем я могу помочь сегодня?
      </h1>
      <div class="mt-4">
        <AppTextarea />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
