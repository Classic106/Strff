import qs from "qs";
import { error } from "~/utils/error";
import { warn } from "~/utils/warn";

export const state = () => ({
  visitors: [],
  count_visitors: 0,
  count_connected_visitors: 0,
});

export const actions = {
  async getCountConnectedCountVisitors({ commit }) {
    try {
      const { data } = await this.$axios.get(`/connected_visitors/count`);

      commit("setCount_connected_visitors", data);
    } catch (e) {
      warn(e);
    }
  },
  async getVisitors({ commit }, { from, to }) {
    try {
      const queryData = {
        created_at_gte: from.toISOString().slice(0, 10),
      };

      if (to) {
        queryData.created_at_lte = to.toISOString().slice(0, 10);
      }

      const query = qs.stringify(queryData);

      const { data } = await this.$axios.get(`/visitors?${query}`);

      commit("setVisitors", data);
    } catch (e) {
      error(e);
    }
  },
  async getCountVisitors({ commit }) {
    try {
      const { data } = await this.$axios.get(`/visitors/count`);

      commit("setCountVisitors", data);
    } catch (e) {
      error(e);
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
