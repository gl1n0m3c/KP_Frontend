import { Module } from "vuex";
import { RootState } from "../types";

interface UIState {
  locale: string;
}

const uiModule: Module<UIState, RootState> = {
  namespaced: true,

  state: {
    locale: "en",
  },

  mutations: {
    SET_LOCALE(state, locale: string) {
      state.locale = locale;
    },
  },

  actions: {
    setLocale({ commit }, locale: string) {
      localStorage.setItem("locale", locale);
      commit("SET_LOCALE", locale);
    },
  },
};

export default uiModule;
