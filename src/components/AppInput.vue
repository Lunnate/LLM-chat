<script setup lang="ts">
import { useChat } from '../composables/useChat.ts';
import { useMessage } from '../composables/useMessage.ts';

const { message } = useChat();
const { sendMessage } = useMessage();

</script>

<template>
  <div class="relative pl-6 px-6 pb-4">
    <form @keydown.enter="sendMessage">
      <textarea
        v-model="message"
        class=" w-full bg-neutral-800 focus:outline-none p-3 rounded-lg resize-none"
        placeholder="What's on your mind?"
        rows="1"
      />
      <button
        class="absolute text-white right-12 top-3 cursor-pointer"
        @click="sendMessage"
      >
        Отправить
      </button>
    </form>
  </div>
</template>
<style scoped>

</style>
