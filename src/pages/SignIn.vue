<script setup lang="ts">
import InputField from "../components/ui/InputField.vue";
import ButtonForForms from "../components/ui/ButtonForForms.vue";
import { useAuth } from "../composables/useAuth.ts";
import { useRouter } from "vue-router";
import { ref } from "vue";

const email = ref<string>("");
const password = ref<string>("");
const { signIn } = useAuth();
const router = useRouter();

async function handleSubmit(): Promise<void> {
  try {
    await signIn(email.value, password.value);
    router.push("/");
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
      <h1 class="text-[32px] font-light mb-10 text-center text-white">Вход</h1>
      <input-field label="Email" type="email" v-model="email" />
      <router-link
        class="block text-base text-white ml-auto w-fit"
        to="/reset-password"
      >
        Забыли пароль?
      </router-link>
      <input-field label="Пароль" type="password" v-model="password" />
      <div class="flex flex-col">
        <button-for-forms text="Войти" class="mb-4" @click="handleSubmit" />
        <div class="flex justify-between">
          <span class="text-base text-white opacity-60"> Нет аккаунта? </span>
          <router-link class="no-underline text-base" to="/sign-up">
            Зарегистрироваться
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
