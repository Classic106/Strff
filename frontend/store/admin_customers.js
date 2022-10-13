export const state = () => ({
  customers: [],
  selected: null,
  next: null,
  previous: null,
});

export const actions = {
  async getCustomers({ commit }) {
    try {
      const result = await this.$strapi.find("orders");
      commit("setCustomers", result);
    } catch (e) {
      console.log(e);
    }
  },
};

export const mutations = {
  setCustomers(state, customers) {
    state.customers = customers;
  },
  setSelectedCustomers(state, data) {
    const { selected, previous, next } = data;

    state.selected = selected;
    state.previous = previous;
    state.next = next;
  },
  clearCustomers(state) {
    state.previous = null;
    state.selected = null;
    state.next = null;
    state.customers = [];
  },
};

export const getters = {
  customers: (state) => {
    return state.customers;
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
