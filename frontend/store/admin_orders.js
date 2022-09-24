export const state = () => ({
  orders: [],
  selectedOrder: null,
  nextOrder: null,
  previousOrder: null,
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
  setSelectedProducts(state, data) {
    state = { ...state, data };
  },
  setNextProduct(state, order) {
    state.nextOrder = order;
  },
  clearOrders(state) {
    state.previousOrder = null;
    state.selectedOrder = null;
    state.nextOrder = null;
  },
};

export const getters = {
  orders: (state) => {
    return state.orders;
  },
  selectedOrder: (state) => {
    return state.selectedOrder;
  },
  nextOrder: (state) => {
    return state.nextOrder;
  },
  previousOrder: (state) => {
    return state.previousOrder;
  },
};
