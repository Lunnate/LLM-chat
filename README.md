# LLM-chat

Современное веб-приложение для общения с AI, построенное на Vue 3, TypeScript и Tailwind CSS. Поддерживает множественные чаты с интуитивным интерфейсом и сохранением истории переписки.

## 🛠 Технологии

- **Frontend**: Vue 3 (Composition API)
- **Язык**: TypeScript
- **Стилизация**: Tailwind CSS
- **HTTP клиент**: Axios
- **Роутинг**: Vue Router
- **Сборщик**: Vite
- **API**: OpenRouter (DeepSeek Chat v3.1)

## 📂 Структура проекта

```
src/
├── api/
│   └── useApi.ts              # API интеграция с OpenRouter
├── assets/
│   └── icons/
│       └── trash-svgrepo-com.svg
├── components/
│   ├── AppInput.vue           # Компонент ввода сообщений
│   └── AppSidebar.vue         # Боковая панель с чатами
├── composables/
│   ├── useChat.ts             # Логика управления чатами
│   └── useMessage.ts          # Логика отправки сообщений
├── pages/
│   └── ChatPage.vue           # Страница чата
├── router/
│   └── index.ts               # Настройка роутинга
├── types/
│   └── Chat.ts                # TypeScript интерфейсы
├── App.vue                    # Главный компонент
├── main.ts                    # Точка входа
└── style.css                  # Глобальные стили
```

## Инструкция

### Предварительные требования

- Node.js 18+
- npm или yarn
- API ключ OpenRouter

### Установка

1. **Клонируйте репозиторий**
   ```bash
   git clone https://github.com/Lunnate/LLM-chat.git
   cd LLM-chat
   ```

2. **Установите зависимости**
   ```bash
   npm install
   # или
   yarn install
   ```

3. **Настройте переменные окружения**

   Создайте файл `.env` в корне проекта:
   ```env
   VITE_OPENROUTER_API_KEY=your_openrouter_api_key_here
   ```

4. **Запустите приложение**
   ```bash
   npm run dev
   # или
   yarn dev
   ```

5. **Откройте браузер**

   Перейдите по адресу `http://localhost:5173`
