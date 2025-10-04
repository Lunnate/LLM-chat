import axios, { AxiosError } from "axios";
import type { Chat } from "../types/Chat.ts";
import {
  API_CODE_ERROR_MESSAGE,
  API_CONFIG,
  UI_MESSAGES,
} from "../utils/constants.ts";

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
    if (error instanceof AxiosError) {
      console.log("Error: ", error.response?.status);
      switch (error.response?.status) {
        case 400:
          return API_CODE_ERROR_MESSAGE["400"];
        case 401:
          return API_CODE_ERROR_MESSAGE["401"];
        case 402:
          return API_CODE_ERROR_MESSAGE["402"];
        case 403:
          return API_CODE_ERROR_MESSAGE["403"];
        case 408:
          return API_CODE_ERROR_MESSAGE["408"];
        case 429:
          return API_CODE_ERROR_MESSAGE["429"];
        case 502:
          return API_CODE_ERROR_MESSAGE["502"];
        case 503:
          return API_CODE_ERROR_MESSAGE["503"];
      }
    }
    return UI_MESSAGES.ERROR;
  }
}
