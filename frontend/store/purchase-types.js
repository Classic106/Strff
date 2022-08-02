export const state = () => ({
  types: [],
});

export const mutations = {
  setTypes(state, types) {
    state.types = types;
  },
};

export const getters = {
  getTypes(state) {
    return state.types;
  },
};
