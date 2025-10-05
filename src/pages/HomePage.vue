<script setup lang="ts">
import AppTextarea from "../components/AppTextarea.vue";
import AppButton from "../components/ui/AppButton.vue";
import { useRouter } from "vue-router";
import { useAuth } from "../composables/useAuth.ts";
const { user } = useAuth();

const router = useRouter();
</script>

<template>
  <div class="flex gap-2 justify-end mt-4 mr-2">
    <AppButton
      v-if="user === null"
      text="Войти"
      class="bg-white text-black"
      @click="router.push('/sign-in')"
    />
    <AppButton
      v-if="user === null"
      text="Зарегистрироваться"
      class="border-1 border-neutral-700"
      @click="router.push('/sign-up')"
    />
  </div>
  <div class="m-auto">
    <div class="mb-4">
      <h1
        class="text-2xl p-4 text-center font-bold from-blue-300 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent"
      >
        Чем я могу помочь сегодня?
      </h1>
      <div class="mt-4">
        <AppTextarea />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
