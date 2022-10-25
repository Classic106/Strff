export const state = () => ({
  orders: [],
  selected: null,
  next: null,
  previous: null,
  sortParams: null,
});

export const actions = {
  async getOrders({ commit }) {
    try {
      const token = this.$cookies.get("token");

      const { data } = await this.$axios.get(`/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      commit("setOrders", data);
    } catch (e) {
      console.log(e);
    }
  },
  async getCustomers() {
    try {
      const token = this.$cookies.get("token");

      const { data } = await this.$axios.get(`/customers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (e) {
      console.log(e);
    }
  },
  async createOrder({ commit }, order) {
    try {
      const token = this.$cookies.get("token");

      const { data } = await this.$axios.post(`/orders`, order, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      commit("addOrder", data);
    } catch (e) {
      console.log(e);
    }
  },
  async updateOrder({ commit }, order) {
    try {
      const token = this.$cookies.get("token");

      const { id } = bundle;
      const { data } = await this.$axios.put(`/orders/${id}`, order, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      commit("updateOrder", data);
    } catch (e) {
      console.log(e);
    }
  },
  async deleteOrders({ commit }, ordersIds) {
    try {
      const token = this.$cookies.get("token");

      const { data } = await this.$axios.delete(`/orders/${ordersIds}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      commit("deleteOrders", ordersIds);
    } catch (e) {
      console.log(e);
    }
  },
};

export const mutations = {
  setSortParams(state, params) {
    state.sortParams = params;
  },
  addOrder(state, order) {
    state.orders.push(order);
  },
  updateOrder(state, order) {
    const index = state.orders.findIndex((item) => item.id === order.id);
    if (index !== -1) {
      state.orders[index] = order;
    }
  },
  deleteOrders(state, ordersIds) {
    const newOrders = state.orders.reduce((acc, item) => {
      if (!ordersIds.includes(item.id)) {
        acc.push(item);
      }
      return acc;
    }, []);
    state.orders = newOrders;
  },
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
  sortParams: (state) => {
    return state.sortParams;
  },
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
