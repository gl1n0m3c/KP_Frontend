import type { Module } from "vuex"
import type { AlertsState, RootState, Alert } from "@/types"
import { mockAlerts, mockDelay } from "@/mock/data"

const alerts: Module<AlertsState, RootState> = {
  namespaced: true,

  state: (): AlertsState => ({
    alerts: [],
    recent: [],
    activeCount: 0,
    loading: false,
  }),

  getters: {
    criticalAlerts: (state): Alert[] =>
      state.alerts.filter((alert) => alert.type === "critical" && !alert.acknowledged),
    warningAlerts: (state): Alert[] => state.alerts.filter((alert) => alert.type === "warning" && !alert.acknowledged),
    unacknowledgedCount: (state): number => state.alerts.filter((alert) => !alert.acknowledged).length,
  },

  mutations: {
    SET_ALERTS(state, alerts: Alert[]) {
      state.alerts = alerts
    },

    SET_RECENT_ALERTS(state, alerts: Alert[]) {
      state.recent = alerts
    },

    SET_ACTIVE_COUNT(state, count: number) {
      state.activeCount = count
    },

    SET_LOADING(state, loading: boolean) {
      state.loading = loading
    },

    ACKNOWLEDGE_ALERT(state, alertId: string) {
      const alert = state.alerts.find((a) => a.id === alertId)
      if (alert) {
        alert.acknowledged = true
      }

      const recentAlert = state.recent.find((a) => a.id === alertId)
      if (recentAlert) {
        recentAlert.acknowledged = true
      }

      // Update active count
      state.activeCount = state.alerts.filter((a) => !a.acknowledged).length
    },

    ADD_ALERT(state, alert: Alert) {
      state.alerts.unshift(alert)
      state.recent.unshift(alert)

      // Keep only last 10 recent alerts
      if (state.recent.length > 10) {
        state.recent = state.recent.slice(0, 10)
      }

      // Update active count
      state.activeCount = state.alerts.filter((a) => !a.acknowledged).length
    },
  },

  actions: {
    async fetchAlerts({ commit }) {
      try {
        commit("SET_LOADING", true)
        await mockDelay(400)

        commit("SET_ALERTS", [...mockAlerts])
        commit("SET_ACTIVE_COUNT", mockAlerts.filter((a) => !a.acknowledged).length)
      } catch (error) {
        console.error("Failed to fetch alerts:", error)
      } finally {
        commit("SET_LOADING", false)
      }
    },

    async fetchRecent({ commit }) {
      try {
        await mockDelay(300)

        // Get 5 most recent alerts
        const recentAlerts = [...mockAlerts]
          .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
          .slice(0, 5)

        commit("SET_RECENT_ALERTS", recentAlerts)
        commit("SET_ACTIVE_COUNT", mockAlerts.filter((a) => !a.acknowledged).length)
      } catch (error) {
        console.error("Failed to fetch recent alerts:", error)
      }
    },

    async acknowledgeAlert({ commit }, alertId: string) {
      try {
        await mockDelay(200)
        commit("ACKNOWLEDGE_ALERT", alertId)
      } catch (error) {
        console.error("Failed to acknowledge alert:", error)
      }
    },

    async createAlert({ commit }, alertData: Partial<Alert>) {
      try {
        await mockDelay(300)

        const newAlert: Alert = {
          id: Date.now().toString(),
          type: alertData.type || "info",
          title: alertData.title || "New Alert",
          message: alertData.message || "",
          timestamp: new Date().toISOString(),
          deviceId: alertData.deviceId,
          acknowledged: false,
        }

        commit("ADD_ALERT", newAlert)
      } catch (error) {
        console.error("Failed to create alert:", error)
      }
    },
  },
}

export default alerts
