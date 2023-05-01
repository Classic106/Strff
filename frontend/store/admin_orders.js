import qs from "qs";
import { error } from "~/utils/error";
import { success } from "~/utils/success";

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
  todayOrders: [],
  countOrders: 0,
});

export const actions = {
  async getOrders({ commit, state }) {
    try {
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

      const total = await this.$axios.get(`/orders/count?${query}`);
      const orders = await this.$axios.get(`/orders?${query}`);

      commit("setTotal", total.data);
      commit("setOrders", orders.data);
    } catch (e) {
      error(e);
    }
  },
  async getAnaliticOrders({ commit }, { from, to }) {
    try {
      const queryData = {
        created_at_gte: from.toISOString(),
      };

      if (to) {
        queryData.created_at_lte = to.toISOString();
      }

      const query = qs.stringify(queryData);

      const { data } = await this.$axios.get(`/orders?${query}`);

      commit("setOrders", data);
    } catch (e) {
      error(e);
    }
  },
  async getOrdersByTime(_, fromDate = new Date()) {
    try {
      const queryData = {
        created_at_gte: fromDate.toISOString().slice(0, 10),
      };

      const query = qs.stringify(queryData);

      const { data } = await this.$axios.get(`/orders?${query}`);
      return data;
    } catch (e) {
      error(e);
    }
  },
  async getCountOrders({ commit }) {
    try {
      const { data } = await this.$axios.get(`/orders/count`);
      commit("setCountOrders", data);
    } catch (e) {
      error(e);
    }
  },
  async getTodayOrders({ commit }) {
    try {
      const queryData = {
        created_at_gte: new Date(new Date().setHours(0, 0, 0)).toISOString(),
      };

      const query = qs.stringify(queryData);

      const { data } = await this.$axios.get(`/orders?${query}`);

      commit("setTodayOrders", data);
    } catch (e) {
      error(e);
    }
  },
  async createOrder({ commit }, order) {
    const { order_bundles, order_items } = order;

    if (!order_items.length && !order_bundles.length) {
      error("Order hasn't any items");
      return;
    }

    try {
      debugger;
      const { data } = await this.$axios.post(`/orders`, {
        ...order,
        order_status: 5,
      });

      commit("addOrder", data);
      success("Order successfully created");
    } catch (e) {
      error(e);
    }
  },
  async updateOrder({ commit }, order) {
    try {
      const { id } = bundle;
      const { data } = await this.$axios.put(`/orders/${id}`, order);

      commit("updateOrder", data);
      success("Order successfully updated");
    } catch (e) {
      error(e);
    }
  },
  async deleteOrders({ commit }, ordersIds) {
    try {
      const { data } = await this.$axios.delete(`/orders/${ordersIds}`);

      commit("deleteOrders", ordersIds);
      success("Order(s) successfully deleted");
    } catch (e) {
      error(e);
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
  setTodayOrders(state, todayOrders) {
    state.todayOrders = todayOrders;
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
  setCountOrders(state, countOrders) {
    state.countOrders = countOrders;
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
    state.params = {
      sort: {
        field: "",
        type: "none",
      },
      search: "",
      page: 1,
      currentPerPage: 10,
    };
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
  todayOrders: (state) => {
    return state.todayOrders;
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
  countOrders: (state) => {
    return state.countOrders;
  },
};
