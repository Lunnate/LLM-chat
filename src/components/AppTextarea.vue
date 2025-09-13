<script setup lang="ts">
import { useChat } from "../composables/useChat.ts";
import { useMessage } from "../composables/useMessage.ts";
import { nextTick, ref, watch } from "vue";

const { message } = useChat();
const { sendMessage, isLoading } = useMessage();

const textAreaHeight = ref<HTMLTextAreaElement | null>(null);
function updateTextAreaHeight(): void {
  if (textAreaHeight.value) {
    textAreaHeight.value.style.height = "auto";
    textAreaHeight.value.style.height =
      textAreaHeight.value.scrollHeight + "px";
  }
}

function handleEnterSubmit(event: KeyboardEvent) {
  if (event.key === "Enter" && !event.shiftKey && !isLoading.value) {
    sendMessage();
    event.preventDefault();
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
    <form @keydown="handleEnterSubmit">
      <textarea
        ref="textAreaHeight"
        v-model="message"
        class="max-h-[1000px] w-[756px] bg-neutral-800 focus:outline-none py-4 px-8 rounded-lg resize-none transition-all duration-300 overflow-y-auto"
        placeholder="Введите сообщение..."
        rows="1"
      />
      <button class="absolute left-7 top-4 cursor-pointer" @click.prevent>
        <img src="../assets/icons/plusIcon.svg" />
      </button>
      <button
        class="absolute right-7 bottom-8.5 rounded-full bg-blue-600 w-[30px] h-[30px] flex items-center justify-center disabled:opacity-50 cursor-pointer"
        :disabled="isLoading || message.length === 0"
        @click="sendMessage"
      >
        <img
          src="../assets/icons/sendMessageIcon.svg"
          class="rotate-90 cursor-pointer"
        />
      </button>
    </form>
  </div>
</template>
<style scoped></style>
