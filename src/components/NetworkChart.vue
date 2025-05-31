<template>
  <div class="relative">
    <div v-if="loading" class="animate-pulse">
      <div class="h-64 bg-gray-200 dark:bg-gray-600 rounded"></div>
    </div>
    <div v-else-if="!data || data.length === 0" class="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
      {{ $t('chart.noData') }}
    </div>
    <canvas
      v-else
      ref="chartCanvas"
      :width="canvasWidth"
      :height="height"
      class="w-full"
    ></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import type { ChartData } from '@/types'

interface Props {
  data: ChartData[]
  loading?: boolean
  height?: number
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  height: 300
})

const { t } = useI18n()
const chartCanvas = ref<HTMLCanvasElement>()
const canvasWidth = ref(800)

const drawChart = (): void => {
  if (!chartCanvas.value || !props.data.length) return

  const canvas = chartCanvas.value
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  const padding = 40
  const chartWidth = canvas.width - padding * 2
  const chartHeight = canvas.height - padding * 2

  // Find min/max values
  const values = props.data.map(d => d.value)
  const minValue = Math.min(...values)
  const maxValue = Math.max(...values)
  const valueRange = maxValue - minValue || 1

  // Draw grid lines
  ctx.strokeStyle = '#e5e7eb'
  ctx.lineWidth = 1
  
  // Horizontal grid lines
  for (let i = 0; i <= 5; i++) {
    const y = padding + (chartHeight / 5) * i
    ctx.beginPath()
    ctx.moveTo(padding, y)
    ctx.lineTo(canvas.width - padding, y)
    ctx.stroke()
  }

  // Draw chart line
  ctx.strokeStyle = '#3b82f6'
  ctx.lineWidth = 2
  ctx.beginPath()

  props.data.forEach((point, index) => {
    const x = padding + (chartWidth / (props.data.length - 1)) * index
    const y = padding + chartHeight - ((point.value - minValue) / valueRange) * chartHeight

    if (index === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  })

  ctx.stroke()

  // Draw data points
  ctx.fillStyle = '#3b82f6'
  props.data.forEach((point, index) => {
    const x = padding + (chartWidth / (props.data.length - 1)) * index
    const y = padding + chartHeight - ((point.value - minValue) / valueRange) * chartHeight

    ctx.beginPath()
    ctx.arc(x, y, 3, 0, 2 * Math.PI)
    ctx.fill()
  })

  // Draw labels
  ctx.fillStyle = '#6b7280'
  ctx.font = '12px sans-serif'
  ctx.textAlign = 'center'

  // Y-axis labels
  for (let i = 0; i <= 5; i++) {
    const value = minValue + (valueRange / 5) * (5 - i)
    const y = padding + (chartHeight / 5) * i
    ctx.textAlign = 'right'
    ctx.fillText(value.toFixed(1), padding - 10, y + 4)
  }

  // X-axis labels (show every few points to avoid crowding)
  const labelStep = Math.ceil(props.data.length / 6)
  props.data.forEach((point, index) => {
    if (index % labelStep === 0) {
      const x = padding + (chartWidth / (props.data.length - 1)) * index
      ctx.textAlign = 'center'
      ctx.fillText(
        new Date(point.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        x,
        canvas.height - 10
      )
    }
  })
}

const updateCanvasSize = (): void => {
  if (!chartCanvas.value) return
  
  const container = chartCanvas.value.parentElement
  if (container) {
    canvasWidth.value = container.clientWidth
  }
}

watch(() => props.data, () => {
  nextTick(() => {
    drawChart()
  })
}, { deep: true })

watch(() => props.loading, (loading) => {
  if (!loading) {
    nextTick(() => {
      drawChart()
    })
  }
})

onMounted(() => {
  updateCanvasSize()
  window.addEventListener('resize', updateCanvasSize)
  
  nextTick(() => {
    drawChart()
  })
})
</script>
