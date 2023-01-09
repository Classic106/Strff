import qs from "qs";
import { error } from "~/utils/error";

export const state = () => ({
  best_sellers: [],
});

export const actions = {
  async getBestSellers({ commit }) {
    try {
      const queryData = {
        _sort: `sales:DESC`,
        _limit: 4,
      };

      const query = qs.stringify(queryData);

      const { data } = await this.$axios.get(`/products?${query}`);

      commit("set_best_sellers", data);
    } catch (e) {
      error(e);
    }
  },
};

export const mutations = {
  set_best_sellers(state, best_sellers) {
    state.best_sellers = best_sellers;
  },
};

export const getters = {
  best_sellers(state) {
    return state.best_sellers;
  },
};
