import { ref } from "vue";
import type { Chat } from '../types/Chat';
import { STORAGE_KEYS } from "../utils/constants.ts";

const message = ref<string>('');
const chats = ref<Chat[]>([]);
const currentChat = ref<Chat | null>(null);

function loadChats(): void {
  const savedChats = localStorage.getItem(STORAGE_KEYS.CHATS);
  if (savedChats) {
    chats.value = JSON.parse(savedChats);
  }
}

function createNewChat(): void {
  const newChat: Chat = {
    id: Date.now().toString(),
    title: message.value.slice(0, 20),
    messages: [],
  };
  chats.value.push(newChat);
  currentChat.value = newChat;
  localStorage.setItem(STORAGE_KEYS.CHATS, JSON.stringify(chats.value));
}

function deleteChat(chatId: string): void {
  chats.value = chats.value.filter((chat) => chat.id !== chatId);
  currentChat.value = null;
  localStorage.setItem(STORAGE_KEYS.CHATS, JSON.stringify(chats.value))
}

loadChats();

export const useChat = () => {
  return {
    message,
    chats,
    currentChat,
    createNewChat,
    deleteChat
  };
};

