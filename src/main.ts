import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import i18n from "./i18n"
import "./style.css"

const app = createApp(App)

app.use(store)
app.use(router)
app.use(i18n)

// Initialize auth on app start
store.dispatch("auth/initializeAuth")

app.mount("#app")
