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
  <div class="h-screen p-6 overflow-y-auto" v-if="currentChat">
    <div
      class="flex flex-col"
      v-for="(message, id) in currentChat.messages"
      :key="id"
    >
      <div v-if="message.role === 'user'" class="flex justify-end break-all">
        <div class="flex flex-col relative">
          <div
            class="p-2 rounded-2xl rounded-br-md bg-blue-600 text-white mb-4 shadow-sm max-w-[100%]"
            v-html="formatMessage(message.content)"
          ></div>
          <svg
            width="18px"
            height="18px"
            viewBox="0 0 24 24"
            fill="none"
            class="absolute bottom-[-12px] right-2 cursor-pointer opacity-80"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z"
              fill="#fff"
            />
          </svg>
        </div>
      </div>
      <div v-else class="flex justify-start">
        <div class="flex flex-col max-w-[45%]">
          <div
            class="relative mb-4 p-2 rounded-2xl rounded-bl-md bg-neutral-800 text-white shadow-sm"
            v-html="formatMessage(message.content)"
          ></div>
          <div class="flex gap-2 items-center">
            <svg
              width="18px"
              height="18px"
              viewBox="0 0 24 24"
              fill="none"
              class="cursor-pointer"
            >
              <path
                d="M3 16V4C3 2.89543 3.89543 2 5 2H15M9 22H18C19.1046 22 20 21.1046 20 20V8C20 6.89543 19.1046 6 18 6H9C7.89543 6 7 6.89543 7 8V20C7 21.1046 7.89543 22 9 22Z"
                stroke="#fff"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <svg
              width="18px"
              height="18px"
              viewBox="0 0 24 24"
              fill="none"
              class="cursor-pointer"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12.444 1.35396C11.6474 0.955692 10.6814 1.33507 10.3687 2.16892L7.807 9.00001L4 9.00001C2.34315 9.00001 1 10.3432 1 12V20C1 21.6569 2.34315 23 4 23H18.3737C19.7948 23 21.0208 22.003 21.3107 20.6119L22.9773 12.6119C23.3654 10.7489 21.9433 9.00001 20.0404 9.00001H14.8874L15.6259 6.7846C16.2554 4.89615 15.4005 2.8322 13.62 1.94198L12.444 1.35396ZM9.67966 9.70225L12.0463 3.39119L12.7256 3.73083C13.6158 4.17595 14.0433 5.20792 13.7285 6.15215L12.9901 8.36755C12.5584 9.66261 13.5223 11 14.8874 11H20.0404C20.6747 11 21.1487 11.583 21.0194 12.204L20.8535 13H17C16.4477 13 16 13.4477 16 14C16 14.5523 16.4477 15 17 15H20.4369L20.0202 17H17C16.4477 17 16 17.4477 16 18C16 18.5523 16.4477 19 17 19H19.6035L19.3527 20.204C19.2561 20.6677 18.8474 21 18.3737 21H8V10.9907C8.75416 10.9179 9.40973 10.4221 9.67966 9.70225ZM6 11H4C3.44772 11 3 11.4477 3 12V20C3 20.5523 3.44772 21 4 21H6V11Z"
                fill="#fff"
              />
            </svg>
            <svg
              width="18px"
              height="18px"
              viewBox="0 0 24 24"
              fill="none"
              class="rotate-180 cursor-pointer"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12.444 1.35396C11.6474 0.955692 10.6814 1.33507 10.3687 2.16892L7.807 9.00001L4 9.00001C2.34315 9.00001 1 10.3432 1 12V20C1 21.6569 2.34315 23 4 23H18.3737C19.7948 23 21.0208 22.003 21.3107 20.6119L22.9773 12.6119C23.3654 10.7489 21.9433 9.00001 20.0404 9.00001H14.8874L15.6259 6.7846C16.2554 4.89615 15.4005 2.8322 13.62 1.94198L12.444 1.35396ZM9.67966 9.70225L12.0463 3.39119L12.7256 3.73083C13.6158 4.17595 14.0433 5.20792 13.7285 6.15215L12.9901 8.36755C12.5584 9.66261 13.5223 11 14.8874 11H20.0404C20.6747 11 21.1487 11.583 21.0194 12.204L20.8535 13H17C16.4477 13 16 13.4477 16 14C16 14.5523 16.4477 15 17 15H20.4369L20.0202 17H17C16.4477 17 16 17.4477 16 18C16 18.5523 16.4477 19 17 19H19.6035L19.3527 20.204C19.2561 20.6677 18.8474 21 18.3737 21H8V10.9907C8.75416 10.9179 9.40973 10.4221 9.67966 9.70225ZM6 11H4C3.44772 11 3 11.4477 3 12V20C3 20.5523 3.44772 21 4 21H6V11Z"
                fill="#fff"
              />
            </svg>
            <svg
              fill="#fff"
              width="18px"
              height="18px"
              viewBox="0 0 24 24"
              class="cursor-pointer"
            >
              <path
                d="M4,12a1,1,0,0,1-2,0A9.983,9.983,0,0,1,18.242,4.206V2.758a1,1,0,1,1,2,0v4a1,1,0,0,1-1,1h-4a1,1,0,0,1,0-2h1.743A7.986,7.986,0,0,0,4,12Zm17-1a1,1,0,0,0-1,1A7.986,7.986,0,0,1,7.015,18.242H8.757a1,1,0,1,0,0-2h-4a1,1,0,0,0-1,1v4a1,1,0,0,0,2,0V19.794A9.984,9.984,0,0,0,22,12,1,1,0,0,0,21,11Z"
              />
            </svg>
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
