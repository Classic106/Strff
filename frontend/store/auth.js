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
      const { jwt, user } = await this.$strapi.$http.$post("auth/local", login);

      this.$cookies.set("token", jwt);
      commit("setUser", user);
    } catch (e) {
      const { data } = e.response;
      const messge = data.message[0].messages[0].id;
      Vue.notify({
        group: "all",
        type: "error",
        text: messge,
      });
    }
  },
  async loginByToken({ commit }, token) {
    try {
      const { data } = await this.$axios.get(`users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      commit("setUser", data);
    } catch (e) {
      const { data } = e.response;
      const messge = data.message[0].messages[0].id;
      Vue.notify({
        group: "all",
        type: "error",
        text: messge,
      });
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
