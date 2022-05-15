export const state = () => ({
  locations: [],
});

export const actions = {
  async fetch({ commit }) {
    const result = await this.$strapi.$locations.find();
    commit("setLocations", result);
  },
};

export const mutations = {
  setLocations(state, locations) {
    state.locations = locations;
  },
};

export const getters = {
  locations(state) {
    return state.locations;
  },
};
