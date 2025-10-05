<script setup lang="ts">
import { ref } from "vue";
import { useAuth } from "../composables/useAuth.ts";
import { useRouter } from "vue-router";

import ButtonForForms from "../components/ui/ButtonForForms.vue";
import InputField from "../components/ui/InputField.vue";

const router = useRouter();
const { resetPassword } = useAuth();
const password = ref<string>("");
const repeatPassword = ref<string>("");

async function handleSubmit() {
  try {
    if (password.value !== repeatPassword.value) {
      alert("Пароли не совпадают");
    }
    await resetPassword(password.value);
    alert("Пароль был изменен");
    router.push("/sign-in");
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <div
      class="bg-black rounded-[20px] p-10 w-full max-w-[450px] backdrop-blur-[10px] border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.3)] animate-[fadeInUp_0.6s_ease]"
    >
      <h1 class="text-[32px] font-light mb-10 text-center text-white">
        Восстановление пароля
      </h1>
      <input-field label="Пароль" type="password" v-model="password" />
      <input-field
        label="Повторите пароль"
        type="password"
        v-model="repeatPassword"
      />
      <button-for-forms text="Отправить" class="mb-4" @click="handleSubmit" />
      <div class="flex justify-between">
        <router-link to="/sign-in" class="text-base text-white">
          Войти
        </router-link>
        <router-link class="no-underline text-base" to="/sign-in">
          Зарегистрироваться
        </router-link>
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
