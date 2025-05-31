import { mount, type VueWrapper } from "@vue/test-utils";
import { createStore } from "vuex";
import { createRouter, createWebHistory } from "vue-router";
import { createI18n } from "vue-i18n";
import type { ComponentMountingOptions } from "@vue/test-utils";
import type { Component } from "vue";
import en from "@/i18n/locales/en.json";
import ru from "@/i18n/locales/ru.json";
import { vi } from "vitest";

// Mock store modules
const mockAuthModule = {
  namespaced: true,
  state: {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
  },
  getters: {
    isAuthenticated: (state: any) => state.isAuthenticated,
    user: (state: any) => state.user,
    loading: (state: any) => state.loading,
  },
  mutations: {
    SET_USER: (state: any, user: any) => {
      state.user = user;
    },
    SET_TOKEN: (state: any, token: any) => {
      state.token = token;
    },
    SET_LOADING: (state: any, loading: boolean) => {
      state.loading = loading;
    },
  },
  actions: {
    login: vi.fn(),
    logout: vi.fn(),
    fetchUser: vi.fn(),
    initializeAuth: vi.fn(),
  },
};

const mockNetworkModule = {
  namespaced: true,
  state: {
    isOnline: true,
    uptime: 99.9,
    averagePing: 18,
    devices: [],
    chartData: [],
    refreshing: false,
    testing: false,
    exporting: false,
  },
  getters: {
    onlineDevicesCount: () => 5,
    offlineDevicesCount: () => 1,
    warningDevicesCount: () => 2,
  },
  mutations: {
    SET_NETWORK_STATUS: (state: any, status: boolean) => {
      state.isOnline = status;
    },
    SET_UPTIME: (state: any, uptime: number) => {
      state.uptime = uptime;
    },
    SET_AVERAGE_PING: (state: any, ping: number) => {
      state.averagePing = ping;
    },
  },
  actions: {
    fetchMetrics: vi.fn(),
    fetchChartData: vi.fn(),
    refreshAllDevices: vi.fn(),
    runNetworkTest: vi.fn(),
    exportData: vi.fn(),
  },
};

const mockAlertsModule = {
  namespaced: true,
  state: {
    alerts: [],
    recent: [],
    activeCount: 0,
    loading: false,
  },
  getters: {
    criticalAlerts: () => [],
    warningAlerts: () => [],
    unacknowledgedCount: () => 0,
  },
  mutations: {
    SET_ALERTS: (state: any, alerts: any[]) => {
      state.alerts = alerts;
    },
    SET_RECENT_ALERTS: (state: any, alerts: any[]) => {
      state.recent = alerts;
    },
    SET_ACTIVE_COUNT: (state: any, count: number) => {
      state.activeCount = count;
    },
  },
  actions: {
    fetchAlerts: vi.fn(),
    fetchRecent: vi.fn(),
    acknowledgeAlert: vi.fn(),
    createAlert: vi.fn(),
  },
};

const mockDevicesModule = {
  namespaced: true,
  state: {
    devices: [],
    loading: false,
  },
  getters: {
    onlineDevices: () => [],
    offlineDevices: () => [],
    warningDevices: () => [],
  },
  mutations: {
    SET_DEVICES: (state: any, devices: any[]) => {
      state.devices = devices;
    },
    SET_LOADING: (state: any, loading: boolean) => {
      state.loading = loading;
    },
  },
  actions: {
    fetchDevices: vi.fn(),
    createDevice: vi.fn(),
    updateDevice: vi.fn(),
    deleteDevice: vi.fn(),
    refreshDevice: vi.fn(),
  },
};

const mockUIModule = {
  namespaced: true,
  state: {
    isDarkMode: false,
    locale: "en",
    sidebarOpen: true,
  },
  getters: {
    isDarkMode: (state: any) => state.isDarkMode,
    locale: (state: any) => state.locale,
    sidebarOpen: (state: any) => state.sidebarOpen,
  },
  mutations: {
    SET_DARK_MODE: (state: any, isDark: boolean) => {
      state.isDarkMode = isDark;
    },
    SET_LOCALE: (state: any, locale: string) => {
      state.locale = locale;
    },
    TOGGLE_SIDEBAR: (state: any) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
  },
  actions: {
    toggleTheme: vi.fn(),
    setLocale: vi.fn(),
    initializeTheme: vi.fn(),
    toggleSidebar: vi.fn(),
  },
};

export function createMockStore(overrides = {}) {
  return createStore({
    modules: {
      auth: mockAuthModule,
      network: mockNetworkModule,
      alerts: mockAlertsModule,
      devices: mockDevicesModule,
      ui: mockUIModule,
      ...overrides,
    },
  });
}

export function createMockRouter() {
  return createRouter({
    history: createWebHistory(),
    routes: [
      { path: "/", redirect: "/dashboard" },
      {
        path: "/login",
        name: "Login",
        component: { template: "<div>Login</div>" },
      },
      {
        path: "/dashboard",
        name: "Dashboard",
        component: { template: "<div>Dashboard</div>" },
      },
      {
        path: "/devices",
        name: "Devices",
        component: { template: "<div>Devices</div>" },
      },
      {
        path: "/alerts",
        name: "Alerts",
        component: { template: "<div>Alerts</div>" },
      },
      {
        path: "/settings",
        name: "Settings",
        component: { template: "<div>Settings</div>" },
      },
    ],
  });
}

export function createMockI18n() {
  return createI18n({
    legacy: false,
    locale: "en",
    fallbackLocale: "en",
    messages: { en, ru },
  });
}

export function mountComponent(
  component: Component,
  options: ComponentMountingOptions<any> = {}
): VueWrapper<any> {
  const store = createMockStore();
  const router = createMockRouter();
  const i18n = createMockI18n();

  return mount(component, {
    global: {
      plugins: [store, router, i18n],
      stubs: {
        "router-link": true,
        "router-view": true,
      },
    },
    ...options,
  });
}

export const mockDevice = {
  id: "1",
  name: "Test Router",
  ip: "192.168.1.1",
  type: "router" as const,
  status: "online" as const,
  lastSeen: new Date().toISOString(),
  ping: 12,
  uptime: 99.8,
};

export const mockAlert = {
  id: "1",
  type: "critical" as const,
  title: "Test Alert",
  message: "This is a test alert",
  timestamp: new Date().toISOString(),
  deviceId: "1",
  acknowledged: false,
};

export const mockUser = {
  id: "1",
  email: "test@example.com",
  name: "Test User",
  role: "admin" as const,
};
