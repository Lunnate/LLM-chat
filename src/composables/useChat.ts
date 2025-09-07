import { ref } from "vue";
import type { Chat } from '../types/Chat';
import { STORAGE_KEYS } from "../utils/constants.ts";
import { v4 as uuidv6 } from 'uuid';

const message = ref<string>('');
const chats = ref<Chat[]>([]);
const currentChat = ref<Chat | null>(null);

function loadChats(): void {

  const savedChats = localStorage.getItem(STORAGE_KEYS.CHATS);
  if (savedChats) {
    chats.value = JSON.parse(savedChats);
  }
}

function loadChatFromUrl(chatId: string): void {
  const foundChat = chats.value.find(chat => chat.id === chatId)
  if (foundChat) {
    currentChat.value = foundChat;
  }
}

function createNewChat(): void {
  const newChat: Chat = {
    id: uuidv6(),
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
    deleteChat,
    loadChatFromUrl
  };
};

