<script setup lang="ts">
import InputField from "../components/ui/InputField.vue";
import ButtonForForms from "../components/ui/ButtonForForms.vue";
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <div
      class="bg-black rounded-[20px] p-10 w-full max-w-[450px] backdrop-blur-[10px] border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.3)] animate-[fadeInUp_0.6s_ease]"
    >
      <h1 class="text-[32px] font-light mb-10 text-center text-white">
        Регистрация
      </h1>
      <input-field label="Логин" type="text" />
      <input-field label="Email" type="email" />
      <input-field label="Пароль" type="password" />
      <input-field label="Повторите пароль" type="password" />
      <div class="flex items-start my-2.5">
        <div class="relative w-5 h-5 mt-[2px] flex-shrink-0">
          <input
            type="checkbox"
            id="terms"
            required
            class="absolute opacity-0 w-full h-full cursor-pointer peer z-10"
          />
          <span
            class="absolute top-[2px] left-0 w-6 h-6 bg-[#101015] border border-white/20 rounded transition-all duration-300 peer-checked:bg-neutral-900 peer-checked:border-white"
          ></span>
          <span
            class="absolute left-[8px] top-1.25 w-[8px] h-[12px] border-solid border-white border-r-[2px] border-b-[2px] border-t-0 border-l-0 rotate-45 opacity-0 transition-opacity duration-200 peer-checked:opacity-100 pointer-events-none"
          ></span>
        </div>
        <label
          class="text-sm leading-[1.5] text-white/80 cursor-pointer select-none mt-1 ml-3"
          for="terms"
        >
          Согласен на обработку персональных данных
        </label>
      </div>
      <div class="flex flex-col">
        <button-for-forms text="Зарегистрироваться" class="mb-4" />
        <div class="flex justify-between">
          <span class="text-base text-white opacity-60">
            Уже есть аккаунт?
          </span>
          <router-link class="no-underline text-base" to="/sign-in">
            Войти
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
