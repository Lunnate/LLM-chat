<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";

interface Chat {
  id: string;
  title: string;
  messages?: Message[];
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

const API_KEY: string = import.meta.env.VITE_OPENROUTER_API_KEY;
const chats = ref<Chat[]>([]);

const currentChat = ref<Chat | null>(null);
const message = ref<string>("");
function loadChats():void {
  const savedChats = localStorage.getItem("chats");
  if (savedChats) {
    chats.value = JSON.parse(savedChats);
  }
}
loadChats();
function createNewChat(): void {
  const newChat: Chat = {
    id: Date.now().toString(),
    title: message.value ? message.value : "Новый чат",
    messages: [],
  };
  chats.value.push(newChat);
  currentChat.value = newChat;
  localStorage.setItem("chats", JSON.stringify(chats.value));
}

function sendMessage(): void {
  if (!message.value) return;
  if (!currentChat.value) {
    createNewChat();
  }
  currentChat.value.messages?.push({
    role: "user",
    content: message.value,
  });
  message.value = "";
  getAnswer();
  localStorage.setItem("chats", JSON.stringify(chats.value));
}

async function getAnswer(): Promise<void> {
  try {
    currentChat.value.messages?.push({
      role: "assistant",
      content: "Печатает...",
    });

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-chat-v3.1:free",
        messages: currentChat.value.messages
          ?.filter((message) => message.content !== "Печатает...")
          ?.map((message) => ({
            role: message.role,
            content: message.content,
          })),
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:5173/",
          "X-Title": "Your App Name",
        },
      },
    );

    const aiMessage: string = response.data.choices[0].message.content;
    const lastIndex: number = currentChat.value.messages.length - 1;
    currentChat.value.messages[lastIndex].content = aiMessage;
    localStorage.setItem("chats", JSON.stringify(chats.value));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("Error: ", error.message);
      const lastIndex: number = currentChat.value.messages.length - 1;
      if (currentChat.value.messages[lastIndex]?.content === "Печатает...") {
        currentChat.value.messages[lastIndex].content =
          "Произошла ошибка при получении ответа";
      }
    }
  }
}
</script>

<template>
  <div class="flex h-screen overflow-hidden bg-neutral-900">
    <aside class="flex flex-col w-72 overflow-y-auto bg-neutral-800">
      <div class="p-4">
        <button
          class="flex items-center justify-between w-full hover:bg-neutral-700 text-white font-semibold py-2 px-2 rounded-lg transition-colors duration-200 cursor-pointer"
          @click="createNewChat"
        >
          <span>Новый чат</span>
        </button>
      </div>
      <nav class="flex flex-1 flex-col p-4">
        <a
          href="#"
          class="hover:bg-neutral-700 rounded-lg p-2"
          v-for="(chat, index) in chats"
          :key="index"
          @click="currentChat = chat"
        >
          <span>{{ chat.title }}</span>
        </a>
      </nav>
      <div class="p-4 border-t border-gray-600">
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

    <main class="flex flex-col flex-1">
      <div class="flex flex-1 justify-center items-center">
        <h1
          v-if="!currentChat"
          class="text-2xl p-4 text-center font-bold from-blue-300 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent"
        >
          Чем я могу помочь сегодня?
        </h1>
        <div v-else class="w-full h-full p-4">
          <div
            class="flex flex-col"
            v-for="(message, id) in currentChat.messages"
            :key="id"
          >
            <div v-if="message.role === 'user'" class="flex justify-end">
              <p
                class="p-2 rounded-2xl rounded-br-md bg-blue-600 text-white mb-4 shadow-sm"
              >
                {{ message.content }}
              </p>
            </div>
            <div v-else class="flex justify-start">
              <p
                class="mb-4 p-2 rounded-2xl rounded-bl-md bg-neutral-800 text-white shadow-sm"
              >
                {{ message.content }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="p-4 md:p-6 w-full max-w-4xl mx-auto">
        <div class="relative pl-6 px-6 pb-4">
          <input
            v-model.trim="message"
            type="text"
            placeholder="Введите ваш запрос здесь..."
            class="w-full border-none rounded-full p-4 bg-neutral-800 focus:outline-none"
          />
          <button
            class="absolute text-white right-12 top-4 cursor-pointer"
            @click="sendMessage"
          >
            Отправить
          </button>
        </div>
        <p class="text-center pb-2">
          LLM может ошибаться. Проверяйте важную информацию.
        </p>
      </div>
    </main>
  </div>
</template>

<style scoped></style>
