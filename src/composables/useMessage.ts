// noinspection D

import { useChat } from './useChat';
import { getAnswer } from './useApi.ts';

export const useMessage = () => {
  const { message, currentChat, createNewChat, chats } = useChat();

  async function sendMessage(): Promise<void> {
    if (!message.value) return;
    if (!currentChat.value) {
      createNewChat();
    }
    if (!currentChat.value) return
    currentChat.value.messages?.push({
      role: 'user',
      content: message.value,
    });

      message.value = '';

      currentChat.value.messages?.push({
        role: 'assistant',
        content: 'Печатает...',
      });

    try {
      const aiMessage: string = await getAnswer(currentChat.value);
      if (currentChat.value?.messages) {
        const lastIndex: number = currentChat.value.messages.length - 1;
        if (currentChat.value.messages[lastIndex]) {
          currentChat.value.messages[lastIndex].content = aiMessage;
        }
      }
      localStorage.setItem('chats', JSON.stringify(chats.value));
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log('Error: ', error.message);
        if (currentChat.value?.messages) {
          const lastIndex: number = currentChat.value.messages.length - 1;
          if (currentChat.value.messages[lastIndex]?.content === 'Печатает...') {
            currentChat.value.messages[lastIndex].content =
              'Произошла ошибка при получении ответа';
          }
        }
      }
    }
  }

  return {
    sendMessage,
  };
};