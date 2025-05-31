<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
    <div class="text-center">
      <div class="mb-8">
        <AlertTriangle class="h-24 w-24 text-gray-400 mx-auto mb-4" />
        <h1 class="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
        <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
          {{ $t('notFound.title') }}
        </h2>
        <p class="text-gray-500 dark:text-gray-400 mb-8">
          {{ $t('notFound.description') }}
        </p>
      </div>
      
      <div class="space-x-4">
        <router-link
          to="/dashboard"
          class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Home class="h-5 w-5 mr-2" />
          {{ $t('notFound.goHome') }}
        </router-link>
        
        <button
          @click="$router.go(-1)"
          class="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <ArrowLeft class="h-5 w-5 mr-2" />
          {{ $t('notFound.goBack') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { AlertTriangle, Home, ArrowLeft } from 'lucide-vue-next'

const { t } = useI18n()
</script>
