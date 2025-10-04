import { createRouter, createWebHistory } from "vue-router";
import ChatPage from "../pages/ChatPage.vue";
import HomePage from "../pages/HomePage.vue";
import SignUp from "../pages/SignUp.vue";
import SignIn from "../pages/SignIn.vue";
import ResetPassword from "../pages/ResetPassword.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "home", component: HomePage },
    { path: "/chat/:id", name: "chat", component: ChatPage },
    {
      path: "/sign-up",
      name: "sign-up",
      component: SignUp,
      meta: { hideSidebar: true },
    },
    {
      path: "/sign-in",
      name: "sign-in",
      component: SignIn,
      meta: { hideSidebar: true },
    },
    {
      path: "/reset-password",
      name: "reset-password",
      component: ResetPassword,
      meta: { hideSidebar: true },
    },
  ],
});

export default router;
