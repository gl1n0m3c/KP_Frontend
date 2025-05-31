import type { Module } from "vuex"
import type { AuthState, RootState, LoginCredentials, User } from "@/types"
import { mockLogin, mockUser, mockDelay } from "@/mock/data"

const auth: Module<AuthState, RootState> = {
  namespaced: true,

  state: (): AuthState => ({
    user: null,
    token: localStorage.getItem("auth_token"),
    isAuthenticated: false,
    loading: false,
  }),

  getters: {
    isAuthenticated: (state): boolean => !!state.token && !!state.user,
    user: (state): User | null => state.user,
    loading: (state): boolean => state.loading,
  },

  mutations: {
    SET_LOADING(state, loading: boolean) {
      state.loading = loading
    },

    SET_USER(state, user: User | null) {
      state.user = user
      state.isAuthenticated = !!user
    },

    SET_TOKEN(state, token: string | null) {
      state.token = token
      if (token) {
        localStorage.setItem("auth_token", token)
      } else {
        localStorage.removeItem("auth_token")
      }
    },

    CLEAR_AUTH(state) {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      localStorage.removeItem("auth_token")
    },
  },

  actions: {
    async login({ commit }, credentials: LoginCredentials) {
      try {
        commit("SET_LOADING", true)

        // Simulate network delay
        await mockDelay(800)

        const result = mockLogin(credentials.email, credentials.password)

        if (result.success && result.user && result.token) {
          commit("SET_TOKEN", result.token)
          commit("SET_USER", result.user)
          return result
        } else {
          commit("CLEAR_AUTH")
          throw new Error(result.error || "Login failed")
        }
      } catch (error) {
        commit("CLEAR_AUTH")
        throw error
      } finally {
        commit("SET_LOADING", false)
      }
    },

    async logout({ commit }) {
      try {
        // Simulate logout delay
        await mockDelay(300)
        commit("CLEAR_AUTH")
      } catch (error) {
        console.error("Logout error:", error)
        commit("CLEAR_AUTH")
      }
    },

    async fetchUser({ commit, state }) {
      if (!state.token) return

      try {
        // Simulate fetching user data
        await mockDelay(200)
        commit("SET_USER", mockUser)
      } catch (error) {
        commit("CLEAR_AUTH")
        throw error
      }
    },

    async initializeAuth({ dispatch, state }) {
      if (state.token) {
        try {
          await dispatch("fetchUser")
        } catch (error) {
          console.error("Failed to initialize auth:", error)
        }
      }
    },
  },
}

export default auth
