import qs from "qs";

import { error } from "~/utils/error";
import { success } from "~/utils/success";

export const state = () => ({
  total: 0,
  params: {
    sort: {
      field: "",
      type: "none",
    },
    search: "",
    page: 1,
    currentPerPage: 10,
  },
  discounts: [],
  selected: null,
});

export const actions = {
  async getDiscounts({ commit, state }) {
    try {
      const { sort, search, page, currentPerPage } = state.params;

      const token = this.$cookies.get("token");

      const queryData = {
        _start: (page - 1) * currentPerPage,
        _limit: currentPerPage,
        _publicationState: token ? "preview" : "live",
      };

      if (sort) {
        const { field, type } = sort;

        if (type !== "none") {
          queryData._sort = `${field}:${type.toUpperCase()}`;
        }
      }

      if (search) {
        if (!isNaN(+search)) {
          queryData._or = [{ id: search, value: search }];
        }
      }

      const query = qs.stringify(queryData);

      const total = await this.$axios.get(`/discounts/count?${query}`);
      const result = await this.$axios.get(`/discounts?${query}`);

      commit("setTotal", total.data);
      commit("setDiscounts", result.data);
    } catch (e) {
      error(e);
    }
  },
  async createDiscount({ dispatch }, discount) {
    try {
      const { data } = await this.$axios.post(`/discounts`, discount);

      dispatch("getDiscounts");
      success("Discount successfully created");
    } catch (e) {
      error(e);
    }
  },
  async updateDiscount({ commit }, discount) {
    try {
      const { id } = discount;
      const { data } = await this.$axios.put(`/discounts/${id}`, discount);

      commit("updateDiscount", data);
      success("Discount successfully updated");
    } catch (e) {
      error(e);
    }
  },
  async deleteDiscounts({ dispatch }, discountsIds) {
    try {
      const { data } = await this.$axios.delete(`/discounts/${discountsIds}`);

      dispatch("getDiscounts");
      success("Discount(s) successfully deleted");
    } catch (e) {
      error(e);
    }
  },
  async statusDiscounts({ dispatch }, { discounts, status }) {
    try {
      const result = await Promise.all(
        discounts.map(async ({ id }) => {
          const discount = {
            id,
            published_at: status === "publish" ? new Date() : null,
          };
          return await this.$axios.put(`/discounts/${id}`, discount);
        })
      ).then(dispatch("getDiscounts"));
    } catch (e) {
      error(e);
    }
  },
};

export const mutations = {
  setTotal(state, total) {
    state.total = total;
  },
  setParams(state, params) {
    state.params = params;
  },
  setDiscounts(state, discounts) {
    state.discounts = discounts;
  },
  updateDiscount(state, discount) {
    const index = state.discounts.findIndex((item) => item.id === discount.id);
    if (index !== -1) {
      state.discounts[index] = discount;
    }
  },
  setSelectedDiscounts(state, data) {
    const { selected, previous, next } = data;

    state.selected = selected;
    state.previous = previous;
    state.next = next;
  },
  clearSelectedDiscount(state) {
    state.selected = null;
  },
  clearDiscounts(state) {
    state.selected = null;
    state.discounts = [];
    state.params = {
      sort: {
        field: "",
        type: "none",
      },
      search: "",
      page: 1,
      currentPerPage: 10,
    };
  },
};

export const getters = {
  total(state) {
    return state.total;
  },
  params(state) {
    return state.params;
  },
  discounts: (state) => {
    return state.discounts;
  },
  selected: (state) => {
    return state.selected;
  },
  next: (state) => {
    return state.next;
  },
  previous: (state) => {
    return state.previous;
  },
};
