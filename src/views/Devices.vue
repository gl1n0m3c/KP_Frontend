<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
              {{ $t('devices.title') }}
            </h1>
            <p class="mt-2 text-gray-600 dark:text-gray-400">
              {{ $t('devices.subtitle') }}
            </p>
          </div>
          <button
            @click="showAddDevice = true"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus class="h-4 w-4 mr-2" />
            {{ $t('devices.addDevice') }}
          </button>
        </div>
      </div>

      <!-- Filters and Search -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <!-- Search -->
          <div class="md:col-span-2">
            <label for="search" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {{ $t('devices.search') }}
            </label>
            <div class="relative">
              <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                id="search"
                v-model="searchQuery"
                type="text"
                :placeholder="$t('devices.searchPlaceholder')"
                class="pl-10 w-full border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <!-- Status Filter -->
          <div>
            <label for="status-filter" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {{ $t('devices.status') }}
            </label>
            <select
              id="status-filter"
              v-model="statusFilter"
              class="w-full border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">{{ $t('devices.allStatuses') }}</option>
              <option value="online">{{ $t('devices.statuses.online') }}</option>
              <option value="offline">{{ $t('devices.statuses.offline') }}</option>
              <option value="warning">{{ $t('devices.statuses.warning') }}</option>
            </select>
          </div>

          <!-- Type Filter -->
          <div>
            <label for="type-filter" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {{ $t('devices.type') }}
            </label>
            <select
              id="type-filter"
              v-model="typeFilter"
              class="w-full border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">{{ $t('devices.allTypes') }}</option>
              <option value="router">{{ $t('devices.types.router') }}</option>
              <option value="switch">{{ $t('devices.types.switch') }}</option>
              <option value="server">{{ $t('devices.types.server') }}</option>
              <option value="workstation">{{ $t('devices.types.workstation') }}</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Devices Table -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            {{ $t('devices.deviceList') }} ({{ filteredDevices.length }})
          </h3>
        </div>

        <div v-if="loading" class="p-6">
          <div class="space-y-4">
            <div v-for="i in 5" :key="i" class="animate-pulse flex items-center space-x-4">
              <div class="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
              <div class="flex-1 space-y-2">
                <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/4"></div>
                <div class="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/6"></div>
              </div>
            </div>
          </div>
        </div>

        <div v-else-if="filteredDevices.length === 0" class="p-6 text-center">
          <Monitor class="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <p class="text-gray-500 dark:text-gray-400">{{ $t('devices.noDevices') }}</p>
        </div>

        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {{ $t('devices.table.device') }}
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {{ $t('devices.table.status') }}
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {{ $t('devices.table.type') }}
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {{ $t('devices.table.ping') }}
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {{ $t('devices.table.uptime') }}
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {{ $t('devices.table.lastSeen') }}
                </th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {{ $t('devices.table.actions') }}
                </th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <tr
                v-for="device in filteredDevices"
                :key="device.id"
                class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0">
                      <component
                        :is="getDeviceIcon(device.type)"
                        class="h-8 w-8 p-1 rounded-lg"
                        :class="getDeviceIconBg(device.type)"
                      />
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900 dark:text-white">
                        {{ device.name }}
                      </div>
                      <div class="text-sm text-gray-500 dark:text-gray-400">
                        {{ device.ip }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    :class="getStatusClasses(device.status)"
                  >
                    <div
                      class="w-2 h-2 rounded-full mr-1.5"
                      :class="getStatusDotColor(device.status)"
                    ></div>
                    {{ $t(`devices.statuses.${device.status}`) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {{ $t(`devices.types.${device.type}`) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {{ device.ping ? `${device.ping}ms` : '-' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {{ device.uptime ? `${device.uptime}%` : '-' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {{ formatLastSeen(device.lastSeen) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex items-center justify-end space-x-2">
                    <button
                      @click="refreshDevice(device.id)"
                      class="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300"
                      :title="$t('devices.refresh')"
                    >
                      <RefreshCw class="h-4 w-4" />
                    </button>
                    <button
                      @click="editDevice(device)"
                      class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
                      :title="$t('devices.edit')"
                    >
                      <Edit class="h-4 w-4" />
                    </button>
                    <button
                      @click="deleteDevice(device.id)"
                      class="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                      :title="$t('devices.delete')"
                    >
                      <Trash2 class="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Add Device Modal -->
      <DeviceModal
        v-if="showAddDevice"
        :device="editingDevice"
        @close="closeModal"
        @save="saveDevice"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import { 
  Plus, Search, Monitor, RefreshCw, Edit, Trash2, 
  Router, Network, Server, Laptop 
} from 'lucide-vue-next'
import DeviceModal from '@/components/DeviceModal.vue'
import type { Device } from '@/types'

// Composables
const store = useStore()
const { t } = useI18n()

// Reactive state
const loading = ref(true)
const searchQuery = ref('')
const statusFilter = ref('')
const typeFilter = ref('')
const showAddDevice = ref(false)
const editingDevice = ref<Device | null>(null)

// Computed properties
const devices = computed(() => store.state.devices.devices)

const filteredDevices = computed(() => {
  let filtered = devices.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(device => 
      device.name.toLowerCase().includes(query) ||
      device.ip.toLowerCase().includes(query)
    )
  }

  if (statusFilter.value) {
    filtered = filtered.filter(device => device.status === statusFilter.value)
  }

  if (typeFilter.value) {
    filtered = filtered.filter(device => device.type === typeFilter.value)
  }

  return filtered
})

// Methods
const getDeviceIcon = (type: Device['type']) => {
  const icons = {
    router: Router,
    switch: Network,
    server: Server,
    workstation: Laptop
  }
  return icons[type]
}

const getDeviceIconBg = (type: Device['type']): string => {
  const classes = {
    router: 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
    switch: 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400',
    server: 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
    workstation: 'bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400'
  }
  return classes[type]
}

const getStatusClasses = (status: Device['status']): string => {
  const classes = {
    online: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    offline: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
  }
  return classes[status]
}

const getStatusDotColor = (status: Device['status']): string => {
  const colors = {
    online: 'bg-green-400',
    offline: 'bg-red-400',
    warning: 'bg-yellow-400'
  }
  return colors[status]
}

const formatLastSeen = (timestamp: string): string => {
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

const refreshDevice = async (deviceId: string): Promise<void> => {
  await store.dispatch('devices/refreshDevice', deviceId)
}

const editDevice = (device: Device): void => {
  editingDevice.value = device
  showAddDevice.value = true
}

const deleteDevice = async (deviceId: string): Promise<void> => {
  if (confirm(t('devices.confirmDelete'))) {
    await store.dispatch('devices/deleteDevice', deviceId)
  }
}

const closeModal = (): void => {
  showAddDevice.value = false
  editingDevice.value = null
}

const saveDevice = async (deviceData: Partial<Device>): Promise<void> => {
  if (editingDevice.value) {
    await store.dispatch('devices/updateDevice', { id: editingDevice.value.id, ...deviceData })
  } else {
    await store.dispatch('devices/createDevice', deviceData)
  }
  closeModal()
}

// Lifecycle
onMounted(async () => {
  await fetchInitialData()
})

const fetchInitialData = async () => {
  loading.value = true
  await store.dispatch('devices/fetchDevices')
  loading.value = false
}
</script>
