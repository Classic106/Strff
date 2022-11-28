import Vue from "vue";

export const state = () => ({
  visitors: [],
  count_visitors: 0,
  count_connected_visitors: 0,
});

export const actions = {
  async getCountConnectedCountVisitors({ commit }) {
    try {
      const token = this.$cookies.get("token");

      const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await this.$axios.get(
        `/connected_visitors/count`,
        headers
      );

      commit("setCount_connected_visitors", data);
    } catch (e) {
      console.warn(e);
    }
  },
  async getVisitors({ commit }) {
    try {
      const token = this.$cookies.get("token");

      const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await this.$axios.get(`/visitors`, headers);

      commit("setVisitors", data);
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
  async getCountVisitors({ commit }) {
    try {
      const token = this.$cookies.get("token");

      const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await this.$axios.get(`/visitors/count`, headers);

      commit("setCountVisitors", data);
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
  setVisitors(state, visitors) {
    state.visitors = visitors;
  },
  setCountVisitors(state, count) {
    state.count_visitors = count;
  },
  setCount_connected_visitors(state, count) {
    state.count_connected_visitors = count;
  },
};

export const getters = {
  visitors(state) {
    return state.visitors;
  },
  count_visitors(state) {
    return state.count_visitors;
  },
  count_connected_visitors(state) {
    return state.count_connected_visitors;
  },
};
