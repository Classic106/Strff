export const state = () => ({
  bundles: [],
  selected: null,
  next: null,
  previous: null,
  sortParams: null,
});

export const actions = {
  async getBundles({ commit }) {
    try {
      const result = await this.$strapi.find("bundles");
      commit("setBundles", result);
    } catch (e) {
      console.log(e);
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
      console.log(e);
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
      console.log(e);
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
      console.log(e);
    }
  },
};

export const mutations = {
  setSortParams(state, params) {
    state.sortParams = params;
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
  setBundles(state, bundles) {
    state.bundles = bundles;
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
  },
};

export const getters = {
  sortParams: (state) => {
    return state.sortParams;
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
