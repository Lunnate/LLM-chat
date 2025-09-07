import { createRouter, createWebHistory } from 'vue-router'
import ChatPage from "../pages/ChatPage.vue";
import HomePage from "../pages/HomePage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/chat/:id', name: 'chat', component: ChatPage }
  ],
})

export default router
