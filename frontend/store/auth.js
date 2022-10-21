export const state = () => ({
  user: null,
});

export const actions = {
  logout({ commit }) {
    this.$cookies.remove("token");
    commit("setUser", null);
    commit("order/dropOrder");
  },
  async login({ commit }, login) {
    try {
      const result = await this.$strapi.$http.$post("auth/local", login);

      const { jwt, user } = result;

      this.$cookies.set("token", jwt);
      commit("setUser", user);
    } catch (e) {
      console.log(e);
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
      console.log(e);
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
