<template>
  <div
    class="p-2 rounded-2xl rounded-br-md bg-neutral-800 text-white mb-4 shadow-sm max-w-[100%]"
    :v-html="text"
  ></div>
</template>

<script setup lang="ts">
const props = defineProps({
  text: String,
});
</script>
