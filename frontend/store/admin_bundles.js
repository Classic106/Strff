import qs from "qs";

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

      const queryData = {
        _start: (page - 1) * currentPerPage,
        _limit: currentPerPage,
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
      const { data } = e.response;
      const messge = data.message[0].messages[0].id;
      Vue.notify({
        group: "all",
        type: "error",
        text: messge,
      });
    }
  },
  async createBundle({ commit }, bundle) {
    try {
      const token = this.$cookies.get("token");

      const { data } = await this.$axios.post(`/bundles`, bundle, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      commit("addBundle", data);
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
  async updateBundle({ commit }, bundle) {
    try {
      const token = this.$cookies.get("token");

      const { id } = bundle;
      const { data } = await this.$axios.put(`/bundles/${id}`, bundle, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      commit("updateBundle", data);
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
  async deleteBundles({ commit }, bundlesIds) {
    try {
      const token = this.$cookies.get("token");

      const { data } = await this.$axios.delete(`/bundles/${bundlesIds}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      commit("deleteBundles", bundlesIds);
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
