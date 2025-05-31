import type { Module } from "vuex"
import type { RootState, Device } from "@/types"
import { mockDevices, mockDelay } from "@/mock/data"

interface DevicesState {
  devices: Device[]
  loading: boolean
}

const devices: Module<DevicesState, RootState> = {
  namespaced: true,

  state: (): DevicesState => ({
    devices: [],
    loading: false,
  }),

  getters: {
    onlineDevices: (state): Device[] => state.devices.filter((d) => d.status === "online"),
    offlineDevices: (state): Device[] => state.devices.filter((d) => d.status === "offline"),
    warningDevices: (state): Device[] => state.devices.filter((d) => d.status === "warning"),
  },

  mutations: {
    SET_DEVICES(state, devices: Device[]) {
      state.devices = devices
    },

    SET_LOADING(state, loading: boolean) {
      state.loading = loading
    },

    ADD_DEVICE(state, device: Device) {
      state.devices.push(device)
    },

    UPDATE_DEVICE(state, updatedDevice: Device) {
      const index = state.devices.findIndex((d) => d.id === updatedDevice.id)
      if (index !== -1) {
        state.devices[index] = updatedDevice
      }
    },

    REMOVE_DEVICE(state, deviceId: string) {
      state.devices = state.devices.filter((d) => d.id !== deviceId)
    },
  },

  actions: {
    async fetchDevices({ commit }) {
      try {
        commit("SET_LOADING", true)
        await mockDelay(500)
        commit("SET_DEVICES", [...mockDevices])
      } catch (error) {
        console.error("Failed to fetch devices:", error)
      } finally {
        commit("SET_LOADING", false)
      }
    },

    async createDevice({ commit }, deviceData: Partial<Device>) {
      try {
        await mockDelay(300)

        const newDevice: Device = {
          id: Date.now().toString(),
          name: deviceData.name || "",
          ip: deviceData.ip || "",
          type: deviceData.type || "workstation",
          status: "offline",
          lastSeen: new Date().toISOString(),
          ping: undefined,
          uptime: 0,
        }

        commit("ADD_DEVICE", newDevice)
      } catch (error) {
        console.error("Failed to create device:", error)
      }
    },

    async updateDevice({ commit }, { id, ...deviceData }: Partial<Device> & { id: string }) {
      try {
        await mockDelay(300)

        const updatedDevice: Device = {
          id,
          name: deviceData.name || "",
          ip: deviceData.ip || "",
          type: deviceData.type || "workstation",
          status: deviceData.status || "offline",
          lastSeen: deviceData.lastSeen || new Date().toISOString(),
          ping: deviceData.ping,
          uptime: deviceData.uptime,
        }

        commit("UPDATE_DEVICE", updatedDevice)
      } catch (error) {
        console.error("Failed to update device:", error)
      }
    },

    async deleteDevice({ commit }, deviceId: string) {
      try {
        await mockDelay(300)
        commit("REMOVE_DEVICE", deviceId)
      } catch (error) {
        console.error("Failed to delete device:", error)
      }
    },

    async refreshDevice({ commit, state }, deviceId: string) {
      try {
        await mockDelay(1000)

        const device = state.devices.find((d) => d.id === deviceId)
        if (device) {
          const updatedDevice: Device = {
            ...device,
            lastSeen: new Date().toISOString(),
            ping: Math.floor(Math.random() * 50) + 5,
            status: Math.random() > 0.1 ? "online" : "offline",
          }

          commit("UPDATE_DEVICE", updatedDevice)
        }
      } catch (error) {
        console.error("Failed to refresh device:", error)
      }
    },
  },
}

export default devices
