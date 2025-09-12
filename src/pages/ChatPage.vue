<script setup lang="ts">
import { useRoute } from "vue-router";
import AppInput from "../components/AppInput.vue";
import { useChat } from "../composables/useChat.ts";
import { onMounted } from "vue";
import TheMessage from "../components/ui/TheMessage.vue";

const { currentChat, loadChatFromUrl } = useChat();

const route = useRoute();

onMounted(() => {
  const chatId = route.params.id;
  if (chatId) {
    loadChatFromUrl(chatId as string);
  }
});
</script>

<template>
  <div class="h-screen p-6 overflow-y-auto" v-if="currentChat">
    <div
      class="flex flex-col"
      v-for="(message, id) in currentChat.messages"
      :key="id"
    >
      <div v-if="message.role === 'user'" class="flex justify-end break-all">
        <div class="flex flex-col relative">
          <TheMessage v-html="message.content" />
          <img
            src="../assets/icons/editChatTitleIcon.svg"
            class="absolute bottom-[-12px] right-2 cursor-pointer opacity-80"
          />
        </div>
      </div>
      <div v-else class="flex justify-start">
        <div class="flex flex-col max-w-[45%]">
          <TheMessage v-html="message.content" />
          <div class="flex gap-2 items-center">
            <img src="../assets/icons/copyIcon.svg" class="cursor-pointer" />
            <img src="../assets/icons/likeIcon.svg" class="cursor-pointer" />
            <img
              src="../assets/icons/likeIcon.svg"
              class="rotate-180 cursor-pointer"
            />
            <img src="../assets/icons/retryIcon.svg" class="cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="p-4 md:p-6 max-w-4xl mx-auto">
    <AppInput />
    <p class="text-center pb-2">
      LLM может ошибаться. Проверяйте важную информацию.
    </p>
  </div>
</template>

<style scoped></style>
