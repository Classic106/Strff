import qs from "qs";
import { error } from "~/utils/error";

export const state = () => ({
  products: [],
  total: 0,
});

export const actions = {
  async getProducts({ commit }, data) {
    try {
      let newData = data;

      if (!newData) {
        newData = {
          search: "",
          currentPage: 1,
          perPage: 3,
        };
      }

      const { search, currentPage, perPage } = newData;

      const queryData = {
        _start: (currentPage - 1) * perPage,
        _limit: perPage,
        _publicationState: "live",
      };

      if (search) {
        queryData._or = [{ title_containss: search }];
      }
      const query = qs.stringify(queryData);

      const total = await this.$axios.get(`/products/count?${query}`);
      const products = await this.$axios.get(`/products?${query}`);

      commit("setTotal", total.data);
      commit("setProducts", products.data);
    } catch (e) {
      error(e);
    }
  },
  async getProduct(_, id) {
    try {
      const { data } = await this.$axios.get(`/products/${id}`);
      return data;
    } catch (e) {
      error(e);
    }
  },
};

export const mutations = {
  setProducts(state, products) {
    state.products = products;
  },
  setTotal(state, total) {
    state.total = total;
  },
  clearAll(state) {
    state.products = [];
    state.product = null;
    state.total = 0;
  },
};

export const getters = {
  products: (state) => {
    return state.products;
  },
  total(state) {
    return state.total;
  },
};