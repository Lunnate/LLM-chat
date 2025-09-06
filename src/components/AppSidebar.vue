<script setup lang="ts">
import { useChat } from '../composables/useChat.ts';
const { createNewChat, chats, currentChat, deleteChat } = useChat();

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
        <router-link
          class="hover:bg-neutral-700 rounded-lg p-2"
          v-for="(chat, index) in chats"
          :key="index"
          @click="currentChat = chat"
          :to="`/chat/${chat.id}`"
        >
          <div class="flex justify-between">
            <span>{{ chat.title }}</span>
            <button class="cursor-pointer" @click="deleteChat(chat.id)">
              <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17" stroke="#ff0028" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>

        </router-link>

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
