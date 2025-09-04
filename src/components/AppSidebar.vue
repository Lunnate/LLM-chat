<script setup lang="ts">
import { useChat } from '../composables/useChat.ts';
const { createNewChat, chats, currentChat } = useChat();
</script>

<template>
  <aside class="flex flex-col w-72 overflow-y-auto bg-neutral-800">
    <div class="p-4">
      <button
        class="flex items-center justify-between w-full hover:bg-neutral-700 text-white font-semibold py-2 px-2 rounded-lg transition-colors duration-200 cursor-pointer"
        @click="createNewChat"
      >
        <span>Новый чат</span>
      </button>
    </div>
    <nav class="flex flex-1 flex-col p-4">
      <a
        href="#"
        class="hover:bg-neutral-700 rounded-lg p-2"
        v-for="(chat, index) in chats"
        :key="index"
        @click="currentChat = chat"
      >
        <span>{{ chat.title }}</span>
      </a>
    </nav>
    <div class="p-4 border-t border-gray-600">
      <a
        href="#"
        class="flex items-center space-x-3 hover:bg-neutral-700 p-2 rounded-md"
      >
        <div
          class="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white"
        >
          A
        </div>
        <span class="text-sm font-medium">Alexey</span>
      </a>
    </div>
  </aside>
</template>

<style scoped></style>
