import axios from 'axios';
import type { Chat } from '../types/Chat';

const API_KEY: string = import.meta.env.VITE_OPENROUTER_API_KEY;

export async function getAnswer(currentChat: Chat): Promise<string> {
  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'deepseek/deepseek-chat-v3.1:free',
        messages: currentChat.messages
          ?.filter((message) => message.content !== 'Печатает...')
          ?.map((message) => ({
            role: message.role,
            content: message.content,
          })),
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": 'application/json',
          "HTTP-Referer": 'http://localhost:5173/',
        },
      },
    );
    return response.data.choices[0].message.content;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log('Error: ', error.message);
      throw new Error('Произошла ошибка при получении ответа');
    }
    throw new Error('Произошла ошибка при получении ответа');
  }
}