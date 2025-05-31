<template>
  <div class="space-y-3">
    <div v-if="loading" class="space-y-3">
      <div v-for="i in (limit || 5)" :key="i" class="animate-pulse">
        <div class="flex items-start space-x-3 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <div class="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full mt-1"></div>
          <div class="flex-1 space-y-2">
            <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
            <div class="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    </div>
    
    <div v-else-if="displayedAlerts.length === 0" class="text-center py-8 text-gray-500 dark:text-gray-400">
      <AlertTriangle class="h-12 w-12 mx-auto mb-4 opacity-50" />
      <p>{{ $t('alerts.noAlerts') }}</p>
    </div>
    
    <div v-else class="space-y-3">
      <div
        v-for="alert in displayedAlerts"
        :key="alert.id"
        class="flex items-start space-x-3 p-3 rounded-lg border transition-colors duration-200"
        :class="getAlertClasses(alert)"
      >
        <div class="flex-shrink-0 mt-1">
          <div
            class="w-3 h-3 rounded-full"
            :class="getStatusColor(alert.type)"
          ></div>
        </div>
        
        <div class="flex-1 min-w-0">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <h4 class="text-sm font-medium text-gray-900 dark:text-white">
                {{ alert.title }}
              </h4>
              <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {{ alert.message }}
              </p>
              <div class="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
                <Clock class="h-3 w-3 mr-1" />
                {{ formatTime(alert.timestamp) }}
                <span v-if="alert.deviceId" class="ml-3 flex items-center">
                  <Monitor class="h-3 w-3 mr-1" />
                  Device {{ alert.deviceId }}
                </span>
              </div>
            </div>
            
            <div class="flex items-center space-x-2 ml-4">
              <span
                class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                :class="getTypeClasses(alert.type)"
              >
                {{ $t(`alerts.types.${alert.type}`) }}
              </span>
              
              <button
                v-if="!alert.acknowledged"
                @click="$emit('acknowledge', alert.id)"
                class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-xs"
              >
                {{ $t('alerts.acknowledge') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { AlertTriangle, Clock, Monitor } from 'lucide-vue-next'
import type { Alert } from '@/types'

interface Props {
  alerts: Alert[]
  loading?: boolean
  limit?: number
}

interface Emits {
  (e: 'acknowledge', alertId: string): void
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  limit: undefined
})

defineEmits<Emits>()

const { t } = useI18n()

const displayedAlerts = computed(() => {
  const sorted = [...props.alerts].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )
  
  return props.limit ? sorted.slice(0, props.limit) : sorted
})

const getAlertClasses = (alert: Alert): string => {
  const base = 'border-l-4'
  const acknowledged = alert.acknowledged ? 'opacity-60' : ''
  
  const typeClasses = {
    critical: 'border-red-500 bg-red-50 dark:bg-red-900/10',
    warning: 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/10',
    info: 'border-blue-500 bg-blue-50 dark:bg-blue-900/10'
  }
  
  return `${base} ${typeClasses[alert.type]} ${acknowledged}`
}

const getStatusColor = (type: Alert['type']): string => {
  const colors = {
    critical: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500'
  }
  return colors[type]
}

const getTypeClasses = (type: Alert['type']): string => {
  const classes = {
    critical: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
    info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
  }
  return classes[type]
}

const formatTime = (timestamp: string): string => {
  const date = new Date(timestamp)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  
  if (days > 0) {
    return `${days}d ago`
  } else if (hours > 0) {
    return `${hours}h ago`
  } else if (minutes > 0) {
    return `${minutes}m ago`
  } else {
    return 'Just now'
  }
}
</script>
