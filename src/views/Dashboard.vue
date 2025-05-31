<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
          {{ $t("dashboard.title") }}
        </h1>
        <p class="mt-2 text-gray-600 dark:text-gray-400">
          {{ $t("dashboard.subtitle") }}
        </p>
      </div>

      <!-- Network Status Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatusCard
          v-for="metric in networkMetrics"
          :key="metric.id"
          :title="$t(metric.title)"
          :value="metric.value"
          :status="metric.status"
          :icon="metric.icon"
          :trend="metric.trend"
          :loading="loading"
        />
      </div>

      <!-- Charts Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <!-- Network Load Chart -->
        <div
          class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              {{ $t("dashboard.networkLoad") }}
            </h3>
            <select
              v-model="selectedTimeRange"
              class="text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="1h">{{ $t("time.1hour") }}</option>
              <option value="24h">{{ $t("time.24hours") }}</option>
              <option value="7d">{{ $t("time.7days") }}</option>
            </select>
          </div>
          <NetworkChart
            :data="chartData"
            :loading="chartLoading"
            :height="300"
          />
        </div>

        <!-- Recent Alerts -->
        <div
          class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              {{ $t("dashboard.recentAlerts") }}
            </h3>
            <router-link
              to="/alerts"
              class="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              {{ $t("common.viewAll") }}
            </router-link>
          </div>
          <AlertsList
            :alerts="recentAlerts"
            :loading="alertsLoading"
            :limit="5"
            @acknowledge="handleAcknowledgeAlert"
          />
        </div>
      </div>

      <!-- Quick Actions -->
      <div
        class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {{ $t("dashboard.quickActions") }}
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ActionButton
            v-for="action in quickActions"
            :key="action.id"
            :title="$t(action.title)"
            :description="$t(action.description)"
            :icon="action.icon"
            :loading="action.loading"
            @click="executeAction(action.id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import {
  Activity,
  Wifi,
  Clock,
  AlertTriangle,
  RefreshCw,
  Play,
  Settings,
  Download,
} from "lucide-vue-next";
import StatusCard from "@/components/StatusCard.vue";
import NetworkChart from "@/components/NetworkChart.vue";
import AlertsList from "@/components/AlertsList.vue";
import ActionButton from "@/components/ActionButton.vue";
import type { NetworkMetric, QuickAction } from "@/types";

// Composables
const store = useStore();
const { t } = useI18n();

// Reactive state
const selectedTimeRange = ref("24h");
const loading = ref(true);
const chartLoading = ref(true);
const alertsLoading = ref(true);

// Load dashboard data function declaration should be before any hook is called
const loadDashboardData = async (): Promise<void> => {
  try {
    loading.value = true;
    chartLoading.value = true;
    alertsLoading.value = true;

    await Promise.all([
      store.dispatch("network/fetchMetrics"),
      store.dispatch("network/fetchChartData", selectedTimeRange.value),
      store.dispatch("alerts/fetchRecent"),
    ]);
  } catch (error) {
    console.error("Failed to load dashboard data:", error);
  } finally {
    loading.value = false;
    chartLoading.value = false;
    alertsLoading.value = false;
  }
};

// Lifecycle
onMounted(() => {
  loadDashboardData();

  // Set up auto-refresh
  const interval = setInterval(() => {
    store.dispatch("network/fetchMetrics");
  }, 30000); // Refresh every 30 seconds

  // Cleanup on unmount
  return () => clearInterval(interval);
});

// Computed properties
const networkMetrics = computed((): NetworkMetric[] => {
  return [
    {
      id: "status",
      title: "dashboard.metrics.status",
      value: store.state.network.isOnline ? "Online" : "Offline",
      status: store.state.network.isOnline ? "success" : "error",
      icon: Wifi,
      trend: null,
    },
    {
      id: "uptime",
      title: "dashboard.metrics.uptime",
      value: `${store.state.network.uptime}%`,
      status: store.state.network.uptime > 99 ? "success" : "warning",
      icon: Clock,
      trend: "+0.1%",
    },
    {
      id: "ping",
      title: "dashboard.metrics.ping",
      value: `${store.state.network.averagePing}ms`,
      status: store.state.network.averagePing < 50 ? "success" : "warning",
      icon: Activity,
      trend: "-2ms",
    },
    {
      id: "alerts",
      title: "dashboard.metrics.activeAlerts",
      value: store.state.alerts.activeCount.toString(),
      status: store.state.alerts.activeCount === 0 ? "success" : "error",
      icon: AlertTriangle,
      trend:
        store.state.alerts.activeCount > 0
          ? `+${store.state.alerts.activeCount}`
          : null,
    },
  ];
});

const chartData = computed(() => store.state.network.chartData);
const recentAlerts = computed(() => store.state.alerts.recent);

const quickActions = computed((): QuickAction[] => {
  return [
    {
      id: "refresh",
      title: "dashboard.actions.refreshAll",
      description: "dashboard.actions.refreshAllDesc",
      icon: RefreshCw,
      loading: store.state.network.refreshing,
    },
    {
      id: "test",
      title: "dashboard.actions.runTest",
      description: "dashboard.actions.runTestDesc",
      icon: Play,
      loading: store.state.network.testing,
    },
    {
      id: "settings",
      title: "dashboard.actions.settings",
      description: "dashboard.actions.settingsDesc",
      icon: Settings,
      loading: false,
    },
    {
      id: "export",
      title: "dashboard.actions.export",
      description: "dashboard.actions.exportDesc",
      icon: Download,
      loading: store.state.network.exporting,
    },
  ];
});

// Methods
const executeAction = async (actionId: string): Promise<void> => {
  switch (actionId) {
    case "refresh":
      await store.dispatch("network/refreshAllDevices");
      break;
    case "test":
      await store.dispatch("network/runNetworkTest");
      break;
    case "settings":
      // Navigate to settings
      break;
    case "export":
      await store.dispatch("network/exportData");
      break;
  }
};

const handleAcknowledgeAlert = async (alertId: string): Promise<void> => {
  await store.dispatch("alerts/acknowledgeAlert", alertId);
};

// Watchers
watch(selectedTimeRange, async (newRange) => {
  chartLoading.value = true;
  await store.dispatch("network/fetchChartData", newRange);
  chartLoading.value = false;
});
</script>
