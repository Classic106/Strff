export const state = () => ({
  customers: [],
  selected: null,
  next: null,
  previous: null,
  sortParams: null,
});

export const actions = {
  async getCustomers({ commit }) {
    try {
      const token = this.$cookies.get("token");

      const { data } = await this.$axios.get(`/customers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      commit("setCustomers", data);
    } catch (e) {
      console.log(e);
    }
  },
  async createCustomer({ commit }, customer) {
    try {
      const token = this.$cookies.get("token");

      const { data } = await this.$axios.post(`/customers`, customer, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      commit("addCustomer", data);
    } catch (e) {
      console.log(e);
    }
  },
  async deleteCustomers({ commit }, customersIds) {
    try {
      const token = this.$cookies.get("token");

      const { data } = await this.$axios.delete(`/customers/${customersIds}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      commit("deleteCustomers", customersIds);
    } catch (e) {
      console.log(e);
    }
  },
};

export const mutations = {
  setSortParams(state, params) {
    state.sortParams = params;
  },
  addCustomer(state, customer) {
    state.customers.push(customer);
  },
  deleteCustomers(state, customersIds) {
    const newCustomers = state.customers.reduce((acc, item) => {
      if (!customersIds.includes(item.id)) {
        acc.push(item);
      }
    }, []);
    state.customers = newCustomers;
  },
  setCustomers(state, customers) {
    state.customers = customers;
  },
  setSelectedCustomers(state, data) {
    const { selected, previous, next } = data;

    state.selected = selected;
    state.previous = previous;
    state.next = next;
  },
  clearSelectedCustomers(state) {
    state.previous = null;
    state.selected = null;
    state.next = null;
  },
  clearCustomers(state) {
    state.previous = null;
    state.selected = null;
    state.next = null;
    state.customers = [];
  },
};

export const getters = {
  sortParams: (state) => {
    return state.sortParams;
  },
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
