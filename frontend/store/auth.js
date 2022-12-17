import { error } from "../utils/error";

export const state = () => ({
  user: null,
});

export const actions = {
  logout({ commit }) {
    this.$cookies.remove("token");
    commit("setUser", null);
  },
  async login({ commit }, login) {
    try {
      const { jwt, user } = await this.$axios.$post("auth/local", login);

      this.$cookies.set("token", jwt);
      commit("setUser", user);
    } catch (e) {
      error(e);
    }
  },
  async loginByToken({ commit }) {
    try {
      const { data } = await this.$axios.get(`users/me`);
      commit("setUser", data);
    } catch (e) {
      this.$cookies.remove("token");
      error(e);
    }
  },
};

export const mutations = {
  setUser(state, user) {
    state.user = user;
  },
};

export const getters = {
  user(state) {
    return state.user;
  },
  username: (state) => {
    return state.user && state.user.username;
  },
};
