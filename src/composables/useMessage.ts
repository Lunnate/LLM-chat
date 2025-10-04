import { useChat } from "./useChat";
import { getAnswer } from "../api/useApi.ts";
import { UI_MESSAGES } from "../utils/constants.ts";
import { validateMessage } from "../utils/validation.ts";
import { ref } from "vue";

export const useMessage = () => {
  const isLoading = ref<boolean>(false);
  const { message, currentChat, addMessageToChat, updateLastMessage } =
    useChat();

  async function sendMessage(): Promise<void> {
    isLoading.value = true;
    if (!validateMessage(message.value)) return;
    addMessageToChat("user", message.value);
    message.value = "";
    addMessageToChat("assistant", UI_MESSAGES.PENDING_MESSAGE);

    try {
      if (!currentChat.value) return;
      const aiMessage: string = await getAnswer(currentChat.value);
      updateLastMessage(aiMessage);
      isLoading.value = false;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log("Error: ", error.message);
        updateLastMessage(UI_MESSAGES.ERROR);
        isLoading.value = false;
      }
    }
  }

  return {
    sendMessage,
    isLoading,
  };
};
