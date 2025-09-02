<script setup lang="ts"></script>

<template>
  <div class="flex h-screen overflow-hidden bg-neutral-900">
    <aside class="flex flex-col w-72 overflow-y-auto bg-neutral-800">
      <div class="p-4">
        <button
          class="flex items-center justify-between w-full hover:bg-neutral-700 text-white font-semibold py-2 px-2 rounded-lg transition-colors duration-200 cursor-pointer"
        >
          <span>Новый чат</span>
        </button>
      </div>
      <nav class="flex flex-1 flex-col p-4">
        <a href="#" class="hover:bg-neutral-700 rounded-lg p-2">
          <span>Chat 1</span>
        </a>
        <a href="#" class="hover:bg-neutral-700 rounded-lg p-2">
          <span>Chat 2</span>
        </a>
        <a href="#" class="hover:bg-neutral-700 rounded-lg p-2">
          <span>Chat 3</span>
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
          class="text-2xl p-4 text-center font-bold from-blue-300 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent"
        >
          Чем я могу помочь сегодня?
        </h1>
      </div>

      <div class="p-4 md:p-6 w-full max-w-4xl mx-auto">
        <div class="relative pl-6 px-6 pb-4">
          <input
            type="text"
            placeholder="Введите ваш запрос здесь..."
            class="w-full border-none rounded-full p-4 bg-neutral-800 focus:outline-none"
          />
          <button class="absolute text-white right-12 top-4 cursor-pointer">
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
