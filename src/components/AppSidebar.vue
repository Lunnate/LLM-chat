<script setup lang="ts">
import { useChat } from "../composables/useChat.ts";
import { ref } from "vue";
const { chats, currentChat, deleteChat, updateChatTitle, editingChatId } =
  useChat();
const titleInput = ref("");
</script>

<template>
  <aside class="flex flex-col w-72 overflow-y-auto bg-neutral-800">
    <div class="p-4">
      <router-link
        to="/"
        class="flex items-center gap-2 w-full hover:bg-neutral-700 text-white font-semibold py-2 px-2 rounded-lg transition-colors duration-200 cursor-pointer"
        @click="currentChat = null"
      >
        <svg fill="#fff" width="18px" height="18px" viewBox="0 0 32 32">
          <path
            d="M24.98 30.009h-23v-25h14.050l2.022-1.948-0.052-0.052h-16.020c-1.105 0-2 0.896-2 2v25c0 1.105 0.895 2 2 2h23c1.105 0 2-0.895 2-2v-14.646l-2 1.909v12.736zM30.445 1.295c-0.902-0.865-1.898-1.304-2.961-1.304-1.663 0-2.876 1.074-3.206 1.403-0.468 0.462-13.724 13.699-13.724 13.699-0.104 0.106-0.18 0.235-0.219 0.38-0.359 1.326-2.159 7.218-2.176 7.277-0.093 0.302-0.010 0.631 0.213 0.851 0.159 0.16 0.373 0.245 0.591 0.245 0.086 0 0.172-0.012 0.257-0.039 0.061-0.020 6.141-1.986 7.141-2.285 0.132-0.039 0.252-0.11 0.351-0.207 0.631-0.623 12.816-12.618 13.802-13.637 1.020-1.052 1.526-2.146 1.507-3.253-0.019-1.094-0.55-2.147-1.575-3.129zM29.076 6.285c-0.556 0.574-4.914 4.88-12.952 12.798l-0.615 0.607c-0.921 0.285-3.128 0.994-4.796 1.532 0.537-1.773 1.181-3.916 1.469-4.929 1.717-1.715 13.075-13.055 13.506-13.48 0.084-0.084 0.851-0.821 1.795-0.821 0.536 0 1.053 0.244 1.577 0.748 0.627 0.602 0.95 1.179 0.959 1.72 0.010 0.556-0.308 1.171-0.943 1.827z"
          ></path>
        </svg>
        <span>Новый чат</span>
      </router-link>
    </div>
    <nav class="flex flex-1 flex-col p-4">
      <div
        class="hover:bg-neutral-700 rounded-lg p-2"
        v-for="(chat, index) in chats"
        :key="index"
        @click="currentChat = chat"
      >
        <div class="flex justify-between items-center cursor-pointer">
          <span v-if="editingChatId !== chat.id">{{ chat.title }}</span>
          <input
            v-if="editingChatId === chat.id"
            type="text"
            v-model="titleInput"
            class="focus:outline-none"
            @keydown.enter="updateChatTitle(chat.id, titleInput)"
          />
          <div class="flex items-center gap-2">
            <svg
              v-if="editingChatId !== chat.id"
              @click="
                editingChatId = chat.id;
                titleInput = chat.title;
              "
              width="18px"
              height="18px"
              viewBox="0 0 24 24"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z"
                fill="#808080"
              />
            </svg>
            <router-link to="/" @click.stop="deleteChat(chat.id)">
              <svg
                v-if="editingChatId !== chat.id"
                width="18px"
                height="18px"
                viewBox="0 0 24 20"
                fill="none"
              >
                <path
                  d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17"
                  stroke="#ff0028"
                  stroke-width="1"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </router-link>
          </div>
        </div>
      </div>
    </nav>
    <div class="p-4">
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
