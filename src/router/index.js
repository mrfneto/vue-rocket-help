import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../components/HomeView.vue";
import { getUserState } from "../firebase/useFirebase";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: "/create",
      name: "create",
      component: () => import("../components/CreateView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/update/:id",
      name: "update",
      component: () => import("../components/UpdateView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../components/LoginView.vue"),
      meta: { requiresUnauth: true },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const requiresUnauth = to.matched.some(
    (record) => record.meta.requiresUnauth
  );

  const isAutenticated = await getUserState();

  if (requiresAuth && !isAutenticated) next({ name: "login" });
  else if (requiresUnauth && isAutenticated) next({ name: "home" });
  else next();
});

export default router;
