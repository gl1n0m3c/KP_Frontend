<template>
  <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
    <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800">
      <div class="mt-3">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">
            {{ device ? $t('devices.editDevice') : $t('devices.addDevice') }}
          </h3>
          <button
            @click="$emit('close')"
            class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X class="h-6 w-6" />
          </button>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {{ $t('devices.deviceName') }}
            </label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              class="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              :placeholder="$t('devices.deviceNamePlaceholder')"
            />
          </div>

          <div>
            <label for="ip" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {{ $t('devices.ipAddress') }}
            </label>
            <input
              id="ip"
              v-model="form.ip"
              type="text"
              required
              pattern="^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$"
              class="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="192.168.1.1"
            />
          </div>

          <div>
            <label for="type" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {{ $t('devices.deviceType') }}
            </label>
            <select
              id="type"
              v-model="form.type"
              required
              class="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">{{ $t('devices.selectType') }}</option>
              <option value="router">{{ $t('devices.types.router') }}</option>
              <option value="switch">{{ $t('devices.types.switch') }}</option>
              <option value="server">{{ $t('devices.types.server') }}</option>
              <option value="workstation">{{ $t('devices.types.workstation') }}</option>
            </select>
          </div>

          <div class="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              @click="$emit('close')"
              class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {{ $t('common.cancel') }}
            </button>
            <button
              type="submit"
              class="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {{ $t('common.save') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { X } from 'lucide-vue-next'
import type { Device } from '@/types'

interface Props {
  device?: Device | null
}

interface Emits {
  (e: 'close'): void
  (e: 'save', device: Partial<Device>): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const { t } = useI18n()

const form = reactive({
  name: '',
  ip: '',
  type: '' as Device['type'] | ''
})

onMounted(() => {
  if (props.device) {
    form.name = props.device.name
    form.ip = props.device.ip
    form.type = props.device.type
  }
})

const handleSubmit = (): void => {
  emit('save', {
    name: form.name,
    ip: form.ip,
    type: form.type as Device['type']
  })
}
</script>
