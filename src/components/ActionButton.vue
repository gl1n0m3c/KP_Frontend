<template>
  <button
    @click="$emit('click')"
    :disabled="loading"
    class="group relative p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-all duration-200 hover:border-blue-300 dark:hover:border-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-left"
  >
    <div class="flex items-start space-x-3">
      <div class="flex-shrink-0">
        <div class="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-900/30 transition-colors duration-200">
          <component
            :is="loading ? LoaderIcon : icon"
            class="h-5 w-5 text-blue-600 dark:text-blue-400"
            :class="{ 'animate-spin': loading }"
          />
        </div>
      </div>
      
      <div class="flex-1 min-w-0">
        <h3 class="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
          {{ title }}
        </h3>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {{ description }}
        </p>
      </div>
    </div>
    
    <div class="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-blue-200 dark:group-hover:border-blue-800 transition-colors duration-200"></div>
  </button>
</template>

<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next'
import type { Component } from 'vue'

interface Props {
  title: string
  description: string
  icon: Component
  loading?: boolean
}

interface Emits {
  (e: 'click'): void
}

withDefaults(defineProps<Props>(), {
  loading: false
})

defineEmits<Emits>()

const LoaderIcon = Loader2
</script>
