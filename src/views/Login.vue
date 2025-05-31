<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <div>
        <div class="flex justify-center">
          <Activity class="h-12 w-12 text-blue-600 dark:text-blue-400" />
        </div>
        <h2
          class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white"
        >
          {{ $t("auth.signIn") }}
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          {{ $t("auth.signInSubtitle") }}
        </p>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <div class="space-y-4">
          <div>
            <label
              for="email"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {{ $t("auth.email") }}
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              :placeholder="$t('auth.emailPlaceholder')"
              :class="{ 'border-red-500': errors.email }"
            />
            <p
              v-if="errors.email"
              class="mt-1 text-sm text-red-600 dark:text-red-400"
            >
              {{ errors.email }}
            </p>
          </div>

          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {{ $t("auth.password") }}
            </label>
            <div class="mt-1 relative">
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                required
                class="appearance-none relative block w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                :placeholder="$t('auth.passwordPlaceholder')"
                :class="{ 'border-red-500': errors.password }"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <Eye v-if="showPassword" class="h-4 w-4 text-gray-400" />
                <EyeOff v-else class="h-4 w-4 text-gray-400" />
              </button>
            </div>
            <p
              v-if="errors.password"
              class="mt-1 text-sm text-red-600 dark:text-red-400"
            >
              {{ errors.password }}
            </p>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              v-model="form.rememberMe"
              type="checkbox"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
            />
            <label
              for="remember-me"
              class="ml-2 block text-sm text-gray-900 dark:text-gray-300"
            >
              {{ $t("auth.rememberMe") }}
            </label>
          </div>

          <div class="text-sm">
            <a
              href="#"
              class="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
            >
              {{ $t("auth.forgotPassword") }}
            </a>
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <span
              v-if="loading"
              class="absolute left-0 inset-y-0 flex items-center pl-3"
            >
              <Loader2 class="h-4 w-4 animate-spin" />
            </span>
            {{ loading ? $t("auth.signingIn") : $t("auth.signIn") }}
          </button>
        </div>

        <div v-if="error" class="rounded-md bg-red-50 dark:bg-red-900/20 p-4">
          <div class="flex">
            <AlertTriangle class="h-5 w-5 text-red-400" />
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800 dark:text-red-200">
                {{ $t("auth.error") }}
              </h3>
              <div class="mt-2 text-sm text-red-700 dark:text-red-300">
                {{ error }}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { Activity, Eye, EyeOff, Loader2, AlertTriangle } from "lucide-vue-next";

// Composables
const router = useRouter();
const store = useStore();
const { t } = useI18n();

// Reactive state
const loading = ref(false);
const showPassword = ref(false);
const error = ref("");

const form = reactive({
  email: "",
  password: "",
  rememberMe: false,
});

const errors = reactive({
  email: "",
  password: "",
});

// Validation
const validateForm = (): boolean => {
  errors.email = "";
  errors.password = "";

  if (!form.email) {
    errors.email = t("auth.validation.emailRequired");
    return false;
  }

  if (!/\S+@\S+\.\S+/.test(form.email)) {
    errors.email = t("auth.validation.emailInvalid");
    return false;
  }

  if (!form.password) {
    errors.password = t("auth.validation.passwordRequired");
    return false;
  }

  if (form.password.length < 6) {
    errors.password = t("auth.validation.passwordMinLength");
    return false;
  }

  return true;
};

// Methods
const handleSubmit = async (): Promise<void> => {
  if (!validateForm()) return;

  try {
    loading.value = true;
    error.value = "";

    await store.dispatch("auth/login", {
      email: form.email,
      password: form.password,
      rememberMe: form.rememberMe,
    });

    router.push("/dashboard");
  } catch (err: any) {
    error.value = err.message || t("auth.loginFailed");
  } finally {
    loading.value = false;
  }
};
</script>
