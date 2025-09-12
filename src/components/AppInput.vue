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
        <svg width="24px" height="24px" viewBox="0 0 20 20" fill="none">
          <path
            d="M5 11C4.44772 11 4 10.5523 4 10C4 9.44772 4.44772 9 5 9H15C15.5523 9 16 9.44772 16 10C16 10.5523 15.5523 11 15 11H5Z"
            fill="#808080"
          />
          <path
            d="M9 5C9 4.44772 9.44772 4 10 4C10.5523 4 11 4.44772 11 5V15C11 15.5523 10.5523 16 10 16C9.44772 16 9 15.5523 9 15V5Z"
            fill="#808080"
          />
        </svg>
      </button>
      <button
        class="absolute right-7 bottom-8.5 rounded-full bg-blue-600 w-[30px] h-[30px] flex items-center justify-center disabled:opacity-50 cursor-pointer"
        :disabled="isLoading || message.length === 0"
        @click="sendMessage"
      >
        <svg
          width="20px"
          height="20px"
          viewBox="0 0 24 24"
          fill="none"
          class="rotate-90"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 3C12.2652 3 12.5196 3.10536 12.7071 3.29289L19.7071 10.2929C20.0976 10.6834 20.0976 11.3166 19.7071 11.7071C19.3166 12.0976 18.6834 12.0976 18.2929 11.7071L13 6.41421V20C13 20.5523 12.5523 21 12 21C11.4477 21 11 20.5523 11 20V6.41421L5.70711 11.7071C5.31658 12.0976 4.68342 12.0976 4.29289 11.7071C3.90237 11.3166 3.90237 10.6834 4.29289 10.2929L11.2929 3.29289C11.4804 3.10536 11.7348 3 12 3Z"
            fill="#fff"
          />
        </svg>
      </button>
    </form>
  </div>
</template>
<style scoped></style>
