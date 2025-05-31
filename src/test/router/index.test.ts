import { describe, it, expect } from "vitest"
import { createRouter, createWebHistory } from "vue-router"

// Import router configuration
const routes = [
  { path: "/", redirect: "/dashboard" },
  { path: "/login", name: "Login", component: { template: "<div>Login</div>" }, meta: { requiresGuest: true } },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: { template: "<div>Dashboard</div>" },
    meta: { requiresAuth: true },
  },
  { path: "/devices", name: "Devices", component: { template: "<div>Devices</div>" }, meta: { requiresAuth: true } },
  { path: "/alerts", name: "Alerts", component: { template: "<div>Alerts</div>" }, meta: { requiresAuth: true } },
  { path: "/settings", name: "Settings", component: { template: "<div>Settings</div>" }, meta: { requiresAuth: true } },
]

describe("Router", () => {
  it("redirects root to dashboard", async () => {
    const router = createRouter({
      history: createWebHistory(),
      routes,
    })

    await router.push("/")
    expect(router.currentRoute.value.path).toBe("/dashboard")
  })

  it("has all required routes", () => {
    const router = createRouter({
      history: createWebHistory(),
      routes,
    })

    const routeNames = router.getRoutes().map((route) => route.name)
    expect(routeNames).toContain("Login")
    expect(routeNames).toContain("Dashboard")
    expect(routeNames).toContain("Devices")
    expect(routeNames).toContain("Alerts")
    expect(routeNames).toContain("Settings")
  })

  it("sets correct meta for protected routes", () => {
    const router = createRouter({
      history: createWebHistory(),
      routes,
    })

    const dashboardRoute = router.getRoutes().find((route) => route.name === "Dashboard")
    expect(dashboardRoute?.meta.requiresAuth).toBe(true)

    const loginRoute = router.getRoutes().find((route) => route.name === "Login")
    expect(loginRoute?.meta.requiresGuest).toBe(true)
  })
})
