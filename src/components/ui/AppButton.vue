<script setup lang="ts">
const { text } = defineProps({
  text: String,
});
</script>

<template>
  <button
    class="rounded-full px-2 py-1 text-center cursor-pointer hover:opacity-80"
  >
    {{ text }}
  </button>
</template>

<style scoped></style>
