<script setup lang="ts">
withDefaults(
  defineProps<{
    text: string;
    type?: "button" | "submit" | "reset";
  }>(),
  { type: "button" },
);
</script>

<template>
  <button
    class="w-full px-4 py-4 bg-white opacity-80 rounded-xl text-black text-base font-semibold transition-all duration-300 mt-2.5 hover:opacity-100 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
    :type="type"
  >
    {{ text }}
  </button>
</template>

<style scoped></style>
