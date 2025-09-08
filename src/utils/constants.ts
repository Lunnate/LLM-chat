export const UI_MESSAGES = {
  NEW_CHAT: "Новый чат",
  PENDING_MESSAGE: "Печатает...",
  ERROR: "Произошла ошибка при получении ответа",
  PLACEHOLDER: "Введите сообщение...",
  DISCLAIMER: "LLM может ошибаться. Проверяйте важную информацию",
  SEND: "Отправить",
} as const;

export const API_CONFIG = {
  MODEL: "deepseek/deepseek-chat-v3.1:free",
  BASE_URL: "https://openrouter.ai/api/v1/chat/completions",
  REFERER: "http://localhost:5173/",
} as const;

export const STORAGE_KEYS = {
  CHATS: "chats",
} as const;
