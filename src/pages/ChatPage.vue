<script setup lang="ts">
import { useRoute } from "vue-router";
import AppInput from "../components/AppInput.vue";
import { useChat } from "../composables/useChat.ts";
import { formatMessage } from "../utils/formatter.ts";
import { onMounted } from "vue";

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
  <div class="h-full p-6 overflow-y-auto" v-if="currentChat">
    <div
      class="flex flex-col"
      v-for="(message, id) in currentChat.messages"
      :key="id"
    >
      <div v-if="message.role === 'user'" class="flex justify-end">
        <div
          class="p-2 rounded-2xl rounded-br-md bg-blue-600 text-white mb-4 shadow-sm max-w-[40%]"
          v-html="formatMessage(message.content)"
        ></div>
      </div>
      <div v-else class="flex justify-start">
        <div
          class="mb-4 p-2 rounded-2xl rounded-bl-md bg-neutral-800 text-white shadow-sm max-w-[45%]"
          v-html="formatMessage(message.content)"
        ></div>
      </div>
    </div>
  </div>

  <div class="p-4 md:p-6 w-full max-w-4xl mx-auto">
    <AppInput />
    <p class="text-center pb-2">
      LLM может ошибаться. Проверяйте важную информацию.
    </p>
  </div>
</template>

<style scoped></style>
