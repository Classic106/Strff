import qs from "qs";
import { error } from "../utils/error";
import { success } from "../utils/success";

export const state = () => ({
  customers: [],
  selected: null,
  next: null,
  previous: null,
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
});

export const actions = {
  async getCustomers({ commit, state }) {
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
          queryData._or = [{ orders_count: search }, { total_price: search }];
        } else {
          queryData._or = [
            { firstName_containss: search },
            { email_containss: search },
          ];
        }
      }

      const query = qs.stringify(queryData);

      const total = await this.$axios.get(`/customers/count?${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await this.$axios.get(`/customers?${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      commit("setTotal", total.data);
      commit("setCustomers", result.data);
    } catch (e) {
      error(e);
    }
  },
  async getCustomer(_, id) {
    try {
      const token = this.$cookies.get("token");

      const { data } = await this.$axios.get(`/customers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (e) {
      error(e);
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
      success("Customer successfully created");
    } catch (e) {
      error(e);
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
      success("Customer(s) successfully deleted");
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
  addCustomer(state, customer) {
    state.customers.push(customer);
  },
  deleteCustomers(state, customersIds) {
    const newCustomers = state.customers.reduce((acc, item) => {
      if (!customersIds.includes(item.id)) {
        acc.push(item);
      }
      return acc;
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
