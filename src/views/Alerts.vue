<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
              {{ $t("alerts.title") }}
            </h1>
            <p class="mt-2 text-gray-600 dark:text-gray-400">
              {{ $t("alerts.subtitle") }}
            </p>
          </div>
          <div class="flex items-center space-x-3">
            <button
              @click="markAllAsRead"
              :disabled="unacknowledgedCount === 0"
              class="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <CheckCircle class="h-4 w-4 mr-2" />
              {{ $t("alerts.markAllRead") }}
            </button>
            <button
              @click="showSettings = true"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Settings class="h-4 w-4 mr-2" />
              {{ $t("alerts.settings") }}
            </button>
          </div>
        </div>
      </div>

      <!-- Alert Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div
          class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div class="flex items-center">
            <div class="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
              <AlertTriangle class="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">
                {{ $t("alerts.critical") }}
              </p>
              <p class="text-2xl font-semibold text-gray-900 dark:text-white">
                {{ criticalCount }}
              </p>
            </div>
          </div>
        </div>

        <div
          class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div class="flex items-center">
            <div class="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
              <AlertTriangle
                class="h-6 w-6 text-yellow-600 dark:text-yellow-400"
              />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">
                {{ $t("alerts.warning") }}
              </p>
              <p class="text-2xl font-semibold text-gray-900 dark:text-white">
                {{ warningCount }}
              </p>
            </div>
          </div>
        </div>

        <div
          class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div class="flex items-center">
            <div class="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <Info class="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">
                {{ $t("alerts.info") }}
              </p>
              <p class="text-2xl font-semibold text-gray-900 dark:text-white">
                {{ infoCount }}
              </p>
            </div>
          </div>
        </div>

        <div
          class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div class="flex items-center">
            <div class="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <Clock class="h-6 w-6 text-gray-600 dark:text-gray-400" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">
                {{ $t("alerts.unread") }}
              </p>
              <p class="text-2xl font-semibold text-gray-900 dark:text-white">
                {{ unacknowledgedCount }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div
        class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6"
      >
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label
              for="type-filter"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              {{ $t("alerts.filterByType") }}
            </label>
            <select
              id="type-filter"
              v-model="typeFilter"
              class="w-full border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">{{ $t("alerts.allTypes") }}</option>
              <option value="critical">{{ $t("alerts.critical") }}</option>
              <option value="warning">{{ $t("alerts.warning") }}</option>
              <option value="info">{{ $t("alerts.info") }}</option>
            </select>
          </div>

          <div>
            <label
              for="status-filter"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              {{ $t("alerts.filterByStatus") }}
            </label>
            <select
              id="status-filter"
              v-model="statusFilter"
              class="w-full border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">{{ $t("alerts.allStatuses") }}</option>
              <option value="unread">{{ $t("alerts.unread") }}</option>
              <option value="read">{{ $t("alerts.read") }}</option>
            </select>
          </div>

          <div>
            <label
              for="time-filter"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              {{ $t("alerts.filterByTime") }}
            </label>
            <select
              id="time-filter"
              v-model="timeFilter"
              class="w-full border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">{{ $t("alerts.allTime") }}</option>
              <option value="1h">{{ $t("time.1hour") }}</option>
              <option value="24h">{{ $t("time.24hours") }}</option>
              <option value="7d">{{ $t("time.7days") }}</option>
            </select>
          </div>

          <div class="flex items-end">
            <button
              @click="clearFilters"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {{ $t("alerts.clearFilters") }}
            </button>
          </div>
        </div>
      </div>

      <!-- Alerts List -->
      <div
        class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
      >
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            {{ $t("alerts.alertsList") }} ({{ filteredAlerts.length }})
          </h3>
        </div>

        <AlertsList
          :alerts="filteredAlerts"
          :loading="loading"
          @acknowledge="handleAcknowledgeAlert"
        />
      </div>

      <!-- Alert Settings Modal -->
      <AlertSettingsModal
        v-if="showSettings"
        @close="showSettings = false"
        @save="saveSettings"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import AlertsList from "@/components/AlertsList.vue";
import AlertSettingsModal from "@/components/AlertSettingsModal.vue";
import type { Alert } from "@/types";

// Composables
const store = useStore();
const { t } = useI18n();

// Reactive state
const loading = ref(true);
const typeFilter = ref("");
const statusFilter = ref("");
const timeFilter = ref("");
const showSettings = ref(false);

// Computed properties
const alerts = computed(() => store.state.alerts.alerts);
const unacknowledgedCount = computed(
  () => store.getters["alerts/unacknowledgedCount"]
);
const criticalCount = computed(
  () => store.getters["alerts/criticalAlerts"].length
);
const warningCount = computed(
  () => store.getters["alerts/warningAlerts"].length
);
const infoCount = computed(
  () => alerts.value.filter((a) => a.type === "info").length
);

const filteredAlerts = computed(() => {
  let filtered = alerts.value;

  if (typeFilter.value) {
    filtered = filtered.filter((alert) => alert.type === typeFilter.value);
  }

  if (statusFilter.value) {
    if (statusFilter.value === "unread") {
      filtered = filtered.filter((alert) => !alert.acknowledged);
    } else if (statusFilter.value === "read") {
      filtered = filtered.filter((alert) => alert.acknowledged);
    }
  }

  if (timeFilter.value) {
    const now = new Date();
    let timeLimit = 0;

    switch (timeFilter.value) {
      case "1h":
        timeLimit = 60 * 60 * 1000;
        break;
      case "24h":
        timeLimit = 24 * 60 * 60 * 1000;
        break;
      case "7d":
        timeLimit = 7 * 24 * 60 * 60 * 1000;
        break;
    }

    if (timeLimit > 0) {
      filtered = filtered.filter(
        (alert) =>
          now.getTime() - new Date(alert.timestamp).getTime() <= timeLimit
      );
    }
  }

  return filtered.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
});

// Methods
const handleAcknowledgeAlert = async (alertId: string): Promise<void> => {
  await store.dispatch("alerts/acknowledgeAlert", alertId);
};

const markAllAsRead = async (): Promise<void> => {
  const unreadAlerts = alerts.value.filter((alert) => !alert.acknowledged);
  for (const alert of unreadAlerts) {
    await store.dispatch("alerts/acknowledgeAlert", alert.id);
  }
};

const clearFilters = (): void => {
  typeFilter.value = "";
  statusFilter.value = "";
  timeFilter.value = "";
};

const saveSettings = (settings: any): void => {
  // Save alert settings
  console.log("Saving alert settings:", settings);
  showSettings.value = false;
};

// Lifecycle
onMounted(async () => {
  await store.dispatch("alerts/fetchAlerts");
  loading.value = false;
});
</script>
