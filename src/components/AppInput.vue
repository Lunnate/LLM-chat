<script setup lang="ts">
import { useChat } from "../composables/useChat.ts";
import { useMessage } from "../composables/useMessage.ts";
import { nextTick, ref, watch } from "vue";

const { message } = useChat();
const { sendMessage } = useMessage();

const textAreaHeight = ref<HTMLTextAreaElement | null>(null);
function updateTextAreaHeight(): void {
  if (textAreaHeight.value) {
    textAreaHeight.value.style.height = "auto";
    textAreaHeight.value.style.height =
      textAreaHeight.value.scrollHeight + "px";
  }
}

watch(message, () => {
  nextTick(() => {
    updateTextAreaHeight();
  });
});
</script>

<template>
  <div class="relative pl-6 px-6 pb-4">
    <form @keydown.enter="sendMessage">
      <textarea
        ref="textAreaHeight"
        v-model="message"
        class="w-full bg-neutral-800 focus:outline-none p-3 rounded-lg resize-none transition-all duration-300 overflow-y-auto"
        placeholder="Введите сообщение..."
        rows="1"
      />
      <button
        class="absolute text-white right-12 top-3 cursor-pointer disabled:opacity-50"
        @click="sendMessage"
        :disabled="message.length === 0"
      >
        Отправить
      </button>
    </form>
  </div>
</template>
<style scoped></style>
