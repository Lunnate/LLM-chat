<script setup lang="ts">
import { useChat } from '../composables/useChat.ts';
import { useMessage } from '../composables/useMessage.ts';

const { message } = useChat();
const { sendMessage } = useMessage();
</script>

<template>
  <div class="relative pl-6 px-6 pb-4">
    <input
      v-model.trim="message"
      type="text"
      placeholder="Введите ваш запрос здесь..."
      class="w-full border-none rounded-full p-4 bg-neutral-800 focus:outline-none"
    />
    <button
      class="absolute text-white right-12 top-4 cursor-pointer"
      @click="sendMessage"
    >
      Отправить
    </button>
  </div>
</template>

<style scoped></style>
