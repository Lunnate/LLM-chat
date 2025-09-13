import axios from "axios";
import type { Chat } from "../types/Chat.ts";
import { API_CONFIG, UI_MESSAGES } from "../utils/constants.ts";

const API_KEY: string = import.meta.env.VITE_OPENROUTER_API_KEY;

export async function getAnswer(currentChat: Chat): Promise<string> {
  try {
    const response = await axios.post(
      API_CONFIG.BASE_URL,
      {
        model: API_CONFIG.MODEL,
        messages: currentChat.messages
          ?.filter((message) => message.content !== UI_MESSAGES.PENDING_MESSAGE)
          ?.map((message) => ({
            role: message.role,
            content: message.content,
          })),
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": API_CONFIG.REFERER,
        },
      },
    );
    return response.data.choices[0].message.content;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("Error: ", error.message);
    }
    throw new Error(UI_MESSAGES.ERROR);
  }
}
