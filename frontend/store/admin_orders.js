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
  orders: [],
  selected: null,
  next: null,
  previous: null,
});

export const actions = {
  async getOrders({ commit, state }) {
    try {
      const token = this.$cookies.get("token");

      const { sort, search, page, currentPerPage } = state.params;
      const { field, type } = sort;

      const queryData = {
        _start: (page - 1) * currentPerPage,
        _limit: currentPerPage,
      };

      if (sort && type !== "none") {
        queryData._sort = `${field}:${type.toUpperCase()}`;
      }

      if (search) {
        if (!isNaN(+search)) {
          queryData.total = search;
        } else {
          queryData._or = [
            { "customer.firstName_containss": search },
            { "customer.email_containss": search },
          ];
        }
      }

      const query = qs.stringify(queryData);

      const total = await this.$axios.get(`/orders/count?${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const orders = await this.$axios.get(`/orders?${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      commit("setTotal", total.data);
      commit("setOrders", orders.data);
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
  setTotal(state, total) {
    state.total = total;
  },
  setParams(state, params) {
    state.params = params;
  },
  setOrders(state, orders) {
    state.orders = orders;
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
  total(state) {
    return state.total;
  },
  params(state) {
    return state.params;
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
