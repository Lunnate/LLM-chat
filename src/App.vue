<script setup lang="ts">
import { watch } from "vue";
import { useChat } from "./composables/useChat.ts";

import router from "./router";
import AppSidebar from "./components/AppSidebar.vue";

const { currentChat } = useChat();

watch(currentChat, () => {
  if (currentChat.value) {
    router.push(`/chat/${currentChat.value.id}`);
  }
});
</script>

<template>
  <div class="flex h-screen overflow-hidden bg-neutral-900">
    <AppSidebar v-if="!$route.meta.hideSidebar" />
    <div class="w-screen flex flex-col">
      <router-view />
    </div>
  </div>
</template>

<style scoped></style>
