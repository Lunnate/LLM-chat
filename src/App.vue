<script setup lang="ts">
import { useChat } from "./composables/useChat.ts";
import { watch } from "vue";

import AppSidebar from "./components/AppSidebar.vue";
import AppInput from "./components/AppInput.vue";
import router from "./router";
import ChatPage from "./pages/ChatPage.vue";

const { currentChat } = useChat();
watch(currentChat, () => {
  if (currentChat.value) {
    router.push(`/chat/${currentChat.value.id}`);
  }
})
</script>

<template>
  <div class="flex h-screen overflow-hidden bg-neutral-900">
    <AppSidebar />
    <div v-if="!currentChat" class="flex flex-col justify-center items-center m-auto" >
      <main class="mb-4">
        <h1
          class="text-2xl p-4 text-center font-bold from-blue-300 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent"
        >
          Чем я могу помочь сегодня?
        </h1>
      </main>
      <div class="w-full">
        <AppInput />
      </div>
    </div>
    <div v-else class="w-full flex flex-col">
      <ChatPage />
    </div>
  </div>
</template>

<style scoped></style>
