import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import store from "@/store";

const isProduction = process.env.NODE_ENV === "production";
const baseUrl = isProduction ? "/network/" : "/";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/dashboard",
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
    meta: { requiresGuest: true },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("@/views/Dashboard.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/devices",
    name: "Devices",
    component: () => import("@/views/Devices.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/alerts",
    name: "Alerts",
    component: () => import("@/views/Alerts.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/settings",
    name: "Settings",
    component: () => import("@/views/Settings.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(baseUrl),
  routes,
});

// Navigation guards
router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters["auth/isAuthenticated"];

  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login");
  } else if (to.meta.requiresGuest && isAuthenticated) {
    next("/dashboard");
  } else {
    next();
  }
});

export default router;
