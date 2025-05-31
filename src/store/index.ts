import { createStore } from "vuex"
import auth from "./modules/auth"
import network from "./modules/network"
import alerts from "./modules/alerts"
import ui from "./modules/ui"
import devices from "./modules/devices"
import type { RootState } from "@/types"

const store = createStore<RootState>({
  modules: {
    auth,
    network,
    alerts,
    ui,
    devices,
  },
  strict: process.env.NODE_ENV !== "production",
})

export default store
