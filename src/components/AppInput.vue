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
        :class="{ 'h-16': message.length > 0, 'h-22': message.length > 40 }"
      />
      <button
        class="absolute text-white right-12 top-3 cursor-pointer disabled:opacity-50"
        @click="sendMessage"
        :disabled="message.length === 0"
        :class="{ 'bottom-[-2px]': message.length > 0 }"
      >
        Отправить
      </button>
    </form>
  </div>
</template>
<style scoped>

</style>
