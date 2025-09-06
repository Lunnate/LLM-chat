<script setup lang="ts">
import AppSidebar from './components/AppSidebar.vue';
import { useChat } from './composables/useChat.ts';
import AppInput from './components/AppInput.vue';

const { currentChat } = useChat();

</script>

<template>
  <div class="flex h-screen overflow-hidden bg-neutral-900">

    <AppSidebar />

    <main class="flex flex-col flex-1">
      <div class="flex flex-1 justify-center items-center">
        <h1
          v-if="!currentChat"
          class="text-2xl p-4 text-center font-bold from-blue-300 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent"
        >
          Чем я могу помочь сегодня?
        </h1>
        <div v-else class="w-full h-full p-4">
          <div
            class="flex flex-col"
            v-for="(message, id) in currentChat.messages"
            :key="id"
          >
            <div v-if="message.role === 'user'" class="flex justify-end">
              <p
                class="p-2 rounded-2xl rounded-br-md bg-blue-600 text-white mb-4 shadow-sm max-w-[40%]"
              >
                {{ message.content }}
              </p>
            </div>
            <div v-else class="flex justify-start">
              <p
                class="mb-4 p-2 rounded-2xl rounded-bl-md bg-neutral-800 text-white shadow-sm max-w-[45%]"
              >
                {{ message.content }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="p-4 md:p-6 w-full max-w-4xl mx-auto">
        <AppInput />
        <p class="text-center pb-2">
          LLM может ошибаться. Проверяйте важную информацию.
        </p>
      </div>
    </main>
  </div>
</template>

<style scoped></style>
