import type { Module } from "vuex"
import type { NetworkState, RootState } from "@/types"
import { mockNetworkMetrics, generateMockChartData, mockDelay } from "@/mock/data"

const network: Module<NetworkState, RootState> = {
  namespaced: true,

  state: (): NetworkState => ({
    isOnline: mockNetworkMetrics.isOnline,
    uptime: mockNetworkMetrics.uptime,
    averagePing: mockNetworkMetrics.averagePing,
    devices: [],
    chartData: [],
    refreshing: false,
    testing: false,
    exporting: false,
  }),

  getters: {
    onlineDevicesCount: (state): number => state.devices.filter((d) => d.status === "online").length,
    offlineDevicesCount: (state): number => state.devices.filter((d) => d.status === "offline").length,
    warningDevicesCount: (state): number => state.devices.filter((d) => d.status === "warning").length,
  },

  mutations: {
    SET_NETWORK_STATUS(state, status: boolean) {
      state.isOnline = status
    },

    SET_UPTIME(state, uptime: number) {
      state.uptime = uptime
    },

    SET_AVERAGE_PING(state, ping: number) {
      state.averagePing = ping
    },

    SET_CHART_DATA(state, data: any[]) {
      state.chartData = data
    },

    SET_REFRESHING(state, refreshing: boolean) {
      state.refreshing = refreshing
    },

    SET_TESTING(state, testing: boolean) {
      state.testing = testing
    },

    SET_EXPORTING(state, exporting: boolean) {
      state.exporting = exporting
    },
  },

  actions: {
    async fetchMetrics({ commit }) {
      try {
        await mockDelay(300)

        // Simulate slight variations in metrics
        const uptime = mockNetworkMetrics.uptime + (Math.random() - 0.5) * 0.2
        const ping = mockNetworkMetrics.averagePing + Math.floor((Math.random() - 0.5) * 10)

        commit("SET_UPTIME", Math.round(uptime * 10) / 10)
        commit("SET_AVERAGE_PING", Math.max(1, ping))
        commit("SET_NETWORK_STATUS", Math.random() > 0.05) // 95% uptime simulation
      } catch (error) {
        console.error("Failed to fetch metrics:", error)
      }
    },

    async fetchChartData({ commit }, timeRange = "24h") {
      try {
        await mockDelay(400)
        const chartData = generateMockChartData(timeRange)
        commit("SET_CHART_DATA", chartData)
      } catch (error) {
        console.error("Failed to fetch chart data:", error)
      }
    },

    async refreshAllDevices({ commit }) {
      try {
        commit("SET_REFRESHING", true)
        await mockDelay(1500)

        // Simulate refresh completion
        console.log("All devices refreshed")
      } catch (error) {
        console.error("Failed to refresh devices:", error)
      } finally {
        commit("SET_REFRESHING", false)
      }
    },

    async runNetworkTest({ commit }) {
      try {
        commit("SET_TESTING", true)
        await mockDelay(2000)

        // Simulate test completion
        console.log("Network test completed")
      } catch (error) {
        console.error("Failed to run network test:", error)
      } finally {
        commit("SET_TESTING", false)
      }
    },

    async exportData({ commit }) {
      try {
        commit("SET_EXPORTING", true)
        await mockDelay(1000)

        // Simulate data export
        const data = {
          timestamp: new Date().toISOString(),
          metrics: mockNetworkMetrics,
          devices: mockNetworkMetrics.totalDevices,
        }

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `network-report-${new Date().toISOString().split("T")[0]}.json`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      } catch (error) {
        console.error("Failed to export data:", error)
      } finally {
        commit("SET_EXPORTING", false)
      }
    },
  },
}

export default network
