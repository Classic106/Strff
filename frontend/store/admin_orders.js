export const state = () => ({
  orders: [],
  selected: null,
  next: null,
  previous: null,
});

export const actions = {
  async getOrders({ commit }) {
    try {
      const result = await this.$strapi.find("orders");
      commit("setOrders", result);
    } catch (e) {
      console.log(e);
    }
  },
};

export const mutations = {
  setOrders(state, orders) {
    state.orders = orders;
  },
  setSelectedOrders(state, data) {
    const { selected, previous, next } = data;

    state.selected = selected;
    state.previous = previous;
    state.next = next;
  },
  clearSelectedOrders(state) {
    state.previous = null;
    state.selected = null;
    state.next = null;
  },
  clearOrders(state) {
    state.previous = null;
    state.selected = null;
    state.next = null;
    state.orders = [];
  },
};

export const getters = {
  orders: (state) => {
    return state.orders;
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
