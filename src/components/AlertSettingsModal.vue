<template>
  <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
    <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800">
      <div class="mt-3">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">
            {{ $t('alerts.notificationSettings') }}
          </h3>
          <button
            @click="$emit('close')"
            class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X class="h-6 w-6" />
          </button>
        </div>

        <div class="space-y-4">
          <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div class="flex items-center">
              <Info class="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
              <div>
                <h4 class="text-sm font-medium text-blue-800 dark:text-blue-200">
                  {{ $t('alerts.comingSoon') }}
                </h4>
                <p class="text-sm text-blue-700 dark:text-blue-300 mt-1">
                  {{ $t('alerts.comingSoonDesc') }}
                </p>
              </div>
            </div>
          </div>

          <div class="flex justify-end">
            <button
              @click="$emit('close')"
              class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {{ $t('common.close') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { X, Info } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'

interface Emits {
  (e: 'close'): void
  (e: 'save', settings: any): void
}

defineEmits<Emits>()

const { t } = useI18n()
</script>
