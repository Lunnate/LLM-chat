<script setup lang="ts">
import { useChat } from "./composables/useChat.ts";
import { watch } from "vue";

import AppSidebar from "./components/AppSidebar.vue";
import router from "./router";

const { currentChat } = useChat();

watch(currentChat, () => {
  if (currentChat.value) {
    router.push(`/chat/${currentChat.value.id}`);
  }
});
</script>

<template>
  <div class="flex h-screen overflow-hidden bg-neutral-900">
    <AppSidebar />
    <div class="w-screen flex flex-col">
      <router-view />
    </div>
  </div>
</template>

<style scoped></style>
