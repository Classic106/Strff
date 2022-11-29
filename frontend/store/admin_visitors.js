import Vue from "vue";
import qs from "qs";

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
  async getVisitors({ commit }, fromDate = new Date()) {
    try {
      const token = this.$cookies.get("token");

      const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const queryData = {
        created_at_gte: fromDate.toISOString().slice(0, 10),
      };

      const query = qs.stringify(queryData);

      const { data } = await this.$axios.get(`/visitors?${query}`, headers);

      commit("addVisitors", data);
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
  addVisitors(state, visitors) {
    state.visitors = [...visitors, ...state.visitors];
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
