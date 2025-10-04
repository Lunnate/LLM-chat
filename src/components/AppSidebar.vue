<script setup lang="ts">
import { useChat } from "../composables/useChat.ts";
import { ref } from "vue";
const { chats, currentChat, deleteChat, updateChatTitle, editingChatId } =
  useChat();
const titleInput = ref("");
</script>

<template>
  <aside
    class="flex flex-col w-72 overflow-y-auto bg-neutral-800 overflow-hidden"
  >
    <div class="p-4">
      <router-link
        to="/"
        class="flex items-center gap-2 w-full hover:bg-neutral-700 text-white font-semibold py-2 px-2 rounded-lg transition-colors duration-200 cursor-pointer bg-black justify-center"
        @click="currentChat = null"
      >
        <img src="../assets/icons/newChatIcon.svg" alt="newChatIcon" />
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
            <img
              v-if="editingChatId !== chat.id"
              class="opacity-70"
              src="../assets/icons/editChatTitleIcon.svg"
              @click="
                editingChatId = chat.id;
                titleInput = chat.title;
              "
              alt="editChatTitleIcon"
            />
            <router-link to="/" @click.stop="deleteChat(chat.id)">
              <img
                v-if="editingChatId !== chat.id"
                src="../assets/icons/deleteChatIcon.svg"
                alt="deleteChatIcon"
              />
            </router-link>
          </div>
        </div>
      </div>
    </nav>
  </aside>
</template>

<style scoped></style>
