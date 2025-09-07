import { useChat } from './useChat';
import { getAnswer } from '../api/useApi.ts';
import { UI_MESSAGES, STORAGE_KEYS   } from '../utils/constants.ts';
import { validateMessage } from '../utils/validation.ts';
import { ref } from "vue";

export const useMessage = () => {
  const isLoading = ref<boolean>(false);
  const { message, currentChat, createNewChat, chats } = useChat()

  async function sendMessage(): Promise<void> {

    isLoading.value = true;
    if (!validateMessage(message.value)) return;
    if (!currentChat.value) {
      createNewChat();
    }
    if (!currentChat.value) return;
    currentChat.value.messages?.push({
      role: 'user',
      content: message.value,
    });

      message.value = '';

    currentChat.value.messages?.push({
      role: 'assistant',
      content: UI_MESSAGES.PENDING_MESSAGE,
    })

    try {
      const aiMessage: string = await getAnswer(currentChat.value);
      if (currentChat.value?.messages) {
        const lastIndex: number = currentChat.value.messages.length - 1;
        if (currentChat.value.messages[lastIndex]) {
          currentChat.value.messages[lastIndex].content = aiMessage;
        }
      }
      localStorage.setItem(STORAGE_KEYS.CHATS, JSON.stringify(chats.value))
      isLoading.value = false;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log('Error: ', error.message);
        if (currentChat.value?.messages) {
          const lastIndex: number = currentChat.value.messages.length - 1;
          if (currentChat.value.messages[lastIndex]?.content === UI_MESSAGES.PENDING_MESSAGE) {
            currentChat.value.messages[lastIndex].content =
              UI_MESSAGES.ERROR;
            isLoading.value = false;
          }
        }
      }
    }
  }

  return {
    sendMessage,
    isLoading
  };
};