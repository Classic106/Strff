import qs from "qs";
import { error } from "../utils/error";
import { success } from "../utils/success";

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
  bundles: [],
  selected: null,
  next: null,
  previous: null,
});

export const actions = {
  async getBundles({ commit, state }) {
    try {
      const { sort, search, page, currentPerPage } = state.params;
      const { field, type } = sort;

      const token = this.$cookies.get("token");

      const queryData = {
        _start: (page - 1) * currentPerPage,
        _limit: currentPerPage,
        _publicationState: token ? "preview" : "live",
      };

      if (sort && type !== "none") {
        if (field === "products") {
          queryData._sort = `id:${type.toUpperCase()}`;
        } else {
          queryData._sort = `${field}:${type.toUpperCase()}`;
        }
      }

      if (search) {
        if (!isNaN(+search)) {
          if (field === "products") {
            queryData.id = search;
          } else {
            queryData.price = search;
          }
        } else {
          queryData.title = search;
        }
      }

      const query = qs.stringify(queryData);

      const total = await this.$axios.get(`/bundles/count?${query}`);
      const result = await this.$axios.get(`/bundles?${query}`);

      commit("setTotal", total.data);
      commit("setBundles", result.data);
    } catch (e) {
      error(e);
    }
  },
  async createBundle({ commit }, bundle) {
    try {
      const { data } = await this.$axios.post(`/bundles`, bundle);

      commit("addBundle", data);
      success("Bundle successfully created");
    } catch (e) {
      error(e);
    }
  },
  async updateBundle({ commit }, bundle) {
    try {
      const { id } = bundle;
      const { data } = await this.$axios.put(`/bundles/${id}`, bundle);

      commit("updateBundle", data);
      success("Bundle successfully updated");
    } catch (e) {
      error(e);
    }
  },
  async deleteBundles({ commit }, bundlesIds) {
    try {
      const { data } = await this.$axios.delete(`/bundles/${bundlesIds}`);

      commit("deleteBundles", bundlesIds);
      success("Bundle(s) successfully deleted");
    } catch (e) {
      error(e);
    }
  },
  async statusBundles({ dispatch }, { bundles, status }) {
    try {
      const result = await Promise.all(
        bundles.map(async ({ id }) => {
          const article = {
            id,
            published_at: status === "publish" ? new Date() : null,
          };
          return await this.$axios.put(`/bundles/${id}`, article);
        })
      );

      dispatch("getBundles");
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
  setBundles(state, bundles) {
    state.bundles = bundles;
  },
  addBundle(state, bundle) {
    state.bundles.push(bundle);
  },
  updateBundle(state, bundle) {
    const index = state.bundles.findIndex((item) => item.id === bundle.id);
    if (index !== -1) {
      state.bundles[index] = bundle;
    }
  },
  deleteBundles(state, bundlesIds) {
    const newBundless = state.bundles.reduce((acc, item) => {
      if (!bundlesIds.includes(item.id)) {
        acc.push(item);
      }
      return acc;
    }, []);
    state.bundles = newBundless;
  },
  setSelectedBundles(state, data) {
    const { selected, previous, next } = data;

    state.selected = selected;
    state.previous = previous;
    state.next = next;
  },
  clearSelectedBundles(state) {
    state.previous = null;
    state.selected = null;
    state.next = null;
  },
  clearBundles(state) {
    state.previous = null;
    state.selected = null;
    state.next = null;
    state.bundles = [];
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
  bundles: (state) => {
    return state.bundles;
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
