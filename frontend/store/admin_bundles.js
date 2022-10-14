export const state = () => ({
  bundles: [],
  selected: null,
  next: null,
  previous: null,
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
};

export const mutations = {
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
