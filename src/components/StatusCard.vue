<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-all duration-200 hover:shadow-md">
    <div class="flex items-center justify-between">
      <div class="flex-1">
        <div class="flex items-center">
          <div
            class="flex-shrink-0 p-2 rounded-lg"
            :class="iconBgClass"
          >
            <component
              :is="icon"
              class="h-5 w-5"
              :class="iconClass"
            />
          </div>
          <div class="ml-4">
            <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">
              {{ title }}
            </h3>
            <div class="mt-1 flex items-baseline">
              <div v-if="loading" class="animate-pulse">
                <div class="h-6 bg-gray-200 dark:bg-gray-600 rounded w-16"></div>
              </div>
              <p v-else class="text-2xl font-semibold" :class="valueClass">
                {{ value }}
              </p>
              <span
                v-if="trend && !loading"
                class="ml-2 text-sm font-medium"
                :class="trendClass"
              >
                {{ trend }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div
        class="flex-shrink-0 w-3 h-3 rounded-full"
        :class="statusIndicatorClass"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Component } from 'vue'

interface Props {
  title: string
  value: string
  status: 'success' | 'warning' | 'error'
  icon: Component
  trend?: string | null
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  trend: null,
  loading: false
})

const iconBgClass = computed(() => {
  const classes = {
    success: 'bg-green-100 dark:bg-green-900/20',
    warning: 'bg-yellow-100 dark:bg-yellow-900/20',
    error: 'bg-red-100 dark:bg-red-900/20'
  }
  return classes[props.status]
})

const iconClass = computed(() => {
  const classes = {
    success: 'text-green-600 dark:text-green-400',
    warning: 'text-yellow-600 dark:text-yellow-400',
    error: 'text-red-600 dark:text-red-400'
  }
  return classes[props.status]
})

const valueClass = computed(() => {
  const classes = {
    success: 'text-gray-900 dark:text-white',
    warning: 'text-gray-900 dark:text-white',
    error: 'text-gray-900 dark:text-white'
  }
  return classes[props.status]
})

const statusIndicatorClass = computed(() => {
  const classes = {
    success: 'bg-green-400',
    warning: 'bg-yellow-400',
    error: 'bg-red-400'
  }
  return classes[props.status]
})

const trendClass = computed(() => {
  if (!props.trend) return ''
  
  const isPositive = props.trend.startsWith('+')
  const isNegative = props.trend.startsWith('-')
  
  if (isPositive) {
    return 'text-green-600 dark:text-green-400'
  } else if (isNegative) {
    return 'text-red-600 dark:text-red-400'
  }
  return 'text-gray-500 dark:text-gray-400'
})
</script>
