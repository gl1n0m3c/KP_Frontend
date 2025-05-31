<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
          {{ $t("settings.title") }}
        </h1>
        <p class="mt-2 text-gray-600 dark:text-gray-400">
          {{ $t("settings.subtitle") }}
        </p>
      </div>

      <!-- Settings Sections -->
      <div class="space-y-6">
        <!-- General Settings -->
        <div
          class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3
              class="text-lg font-semibold text-gray-900 dark:text-white flex items-center"
            >
              <Settings class="h-5 w-5 mr-2" />
              {{ $t("settings.general.title") }}
            </h3>
          </div>
          <div class="p-6 space-y-6">
            <!-- Theme Setting -->
            <div class="flex items-center justify-between">
              <div>
                <label
                  class="text-sm font-medium text-gray-900 dark:text-white"
                >
                  {{ $t("settings.general.theme") }}
                </label>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  {{ $t("settings.general.themeDesc") }}
                </p>
              </div>
              <button
                @click="toggleTheme"
                class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                :class="isDarkMode ? 'bg-blue-600' : 'bg-gray-200'"
              >
                <span
                  class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                  :class="isDarkMode ? 'translate-x-5' : 'translate-x-0'"
                ></span>
              </button>
            </div>

            <!-- Language Setting -->
            <div class="flex items-center justify-between">
              <div>
                <label
                  class="text-sm font-medium text-gray-900 dark:text-white"
                >
                  {{ $t("settings.general.language") }}
                </label>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  {{ $t("settings.general.languageDesc") }}
                </p>
              </div>
              <select
                v-model="currentLocale"
                @change="changeLanguage"
                class="border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="en">English</option>
                <option value="ru">Русский</option>
              </select>
            </div>

            <!-- Auto Refresh -->
            <div class="flex items-center justify-between">
              <div>
                <label
                  class="text-sm font-medium text-gray-900 dark:text-white"
                >
                  {{ $t("settings.general.autoRefresh") }}
                </label>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  {{ $t("settings.general.autoRefreshDesc") }}
                </p>
              </div>
              <select
                v-model="autoRefreshIntervalValue"
                class="border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="0">{{ $t("settings.general.disabled") }}</option>
                <option value="30">
                  30 {{ $t("settings.general.seconds") }}
                </option>
                <option value="60">
                  1 {{ $t("settings.general.minute") }}
                </option>
                <option value="300">
                  5 {{ $t("settings.general.minutes") }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <!-- Monitoring Settings -->
        <div
          class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3
              class="text-lg font-semibold text-gray-900 dark:text-white flex items-center"
            >
              <Monitor class="h-5 w-5 mr-2" />
              {{ $t("settings.monitoring.title") }}
            </h3>
          </div>
          <div class="p-6 space-y-6">
            <!-- Ping Interval -->
            <div>
              <label
                class="block text-sm font-medium text-gray-900 dark:text-white mb-2"
              >
                {{ $t("settings.monitoring.pingInterval") }}
              </label>
              <div class="flex items-center space-x-4">
                <input
                  v-model.number="pingIntervalValue"
                  type="number"
                  min="5"
                  max="300"
                  class="w-24 border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                />
                <span class="text-sm text-gray-500 dark:text-gray-400">
                  {{ $t("settings.general.seconds") }}
                </span>
              </div>
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {{ $t("settings.monitoring.pingIntervalDesc") }}
              </p>
            </div>

            <!-- Timeout -->
            <div>
              <label
                class="block text-sm font-medium text-gray-900 dark:text-white mb-2"
              >
                {{ $t("settings.monitoring.timeout") }}
              </label>
              <div class="flex items-center space-x-4">
                <input
                  v-model.number="timeoutValue"
                  type="number"
                  min="1"
                  max="30"
                  class="w-24 border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                />
                <span class="text-sm text-gray-500 dark:text-gray-400">
                  {{ $t("settings.general.seconds") }}
                </span>
              </div>
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {{ $t("settings.monitoring.timeoutDesc") }}
              </p>
            </div>

            <!-- Retry Count -->
            <div>
              <label
                class="block text-sm font-medium text-gray-900 dark:text-white mb-2"
              >
                {{ $t("settings.monitoring.retryCount") }}
              </label>
              <input
                v-model.number="retryCount"
                type="number"
                min="1"
                max="10"
                class="w-24 border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
              />
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {{ $t("settings.monitoring.retryCountDesc") }}
              </p>
            </div>
          </div>
        </div>

        <!-- Notification Settings -->
        <div
          class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3
              class="text-lg font-semibold text-gray-900 dark:text-white flex items-center"
            >
              <Bell class="h-5 w-5 mr-2" />
              {{ $t("settings.notifications.title") }}
            </h3>
          </div>
          <div class="p-6 space-y-6">
            <!-- Email Notifications -->
            <div class="flex items-center justify-between">
              <div>
                <label
                  class="text-sm font-medium text-gray-900 dark:text-white"
                >
                  {{ $t("settings.notifications.email") }}
                </label>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  {{ $t("settings.notifications.emailDesc") }}
                </p>
              </div>
              <button
                @click="emailNotifications = !emailNotifications"
                class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                :class="emailNotifications ? 'bg-blue-600' : 'bg-gray-200'"
              >
                <span
                  class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                  :class="
                    emailNotifications ? 'translate-x-5' : 'translate-x-0'
                  "
                ></span>
              </button>
            </div>

            <!-- Email Address -->
            <div v-if="emailNotifications">
              <label
                class="block text-sm font-medium text-gray-900 dark:text-white mb-2"
              >
                {{ $t("settings.notifications.emailAddress") }}
              </label>
              <input
                v-model="emailAddress"
                type="email"
                class="w-full border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                :placeholder="$t('settings.notifications.emailPlaceholder')"
              />
            </div>

            <!-- Coming Soon Notice -->
            <div
              class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4"
            >
              <div class="flex items-center">
                <Info class="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                <div>
                  <h4
                    class="text-sm font-medium text-blue-800 dark:text-blue-200"
                  >
                    {{ $t("settings.notifications.comingSoon") }}
                  </h4>
                  <p class="text-sm text-blue-700 dark:text-blue-300 mt-1">
                    {{ $t("settings.notifications.comingSoonDesc") }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Save Button -->
        <div class="flex justify-end">
          <button
            @click="saveSettings"
            :disabled="saving"
            class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save v-if="!saving" class="h-5 w-5 mr-2" />
            <Loader2 v-else class="h-5 w-5 mr-2 animate-spin" />
            {{ saving ? $t("settings.saving") : $t("settings.save") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { Settings, Monitor, Bell, Info, Save, Loader2 } from "lucide-vue-next";
import { mockDelay } from "@/mock/data";

// Composables
const store = useStore();
const { t, locale } = useI18n();

// Reactive state
const saving = ref(false);
const currentLocale = ref(locale.value); 

// Load settings from localStorage on component mount
const savedSettings = localStorage.getItem("networkMonitorSettings");
const initialSettings = savedSettings ? JSON.parse(savedSettings) : {};

const autoRefreshIntervalValue = ref(initialSettings.autoRefreshInterval || 30);
const pingIntervalValue = ref(initialSettings.pingInterval || 30);
const timeoutValue = ref(initialSettings.timeout || 5);
const retryCount = ref(initialSettings.retryCount || 3);
const emailNotifications = ref(initialSettings.emailNotifications || false);
const emailAddress = ref(initialSettings.emailAddress || "");

// Computed properties
const isDarkMode = computed(() => store.state.ui.isDarkMode);

// Methods
const toggleTheme = (): void => {
  store.dispatch("ui/toggleTheme");
};

const changeLanguage = (): void => {
  locale.value = currentLocale.value;
  store.dispatch("ui/setLocale", currentLocale.value);
};

const saveSettings = async (): Promise<void> => {
  try {
    saving.value = true;

    // Simulate saving settings
    await mockDelay(1000);

    const settings = {
      autoRefreshInterval: autoRefreshIntervalValue.value,
      pingInterval: pingIntervalValue.value,
      timeout: timeoutValue.value,
      retryCount: retryCount.value,
      emailNotifications: emailNotifications.value,
      emailAddress: emailAddress.value,
    };

    // Save to localStorage for persistence
    localStorage.setItem("networkMonitorSettings", JSON.stringify(settings));

    console.log("Settings saved:", settings);
  } catch (error) {
    console.error("Failed to save settings:", error);
  } finally {
    saving.value = false;
  }
};

// Lifecycle
onMounted(() => {});
</script>
