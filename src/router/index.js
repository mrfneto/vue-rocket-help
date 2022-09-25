import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../components/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../components/LoginView.vue"),
    },
  ],
});

export default router;
