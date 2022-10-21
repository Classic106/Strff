export const state = () => ({
  products: [],
  selected: null,
  next: null,
  previous: null,
});

export const actions = {
  async getProducts({ commit }) {
    try {
      const token = this.$cookies.get("token");

      const { data } = await this.$axios.get(`/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      commit("setProducts", data);
    } catch (e) {
      console.log(e);
    }
  },
};

export const mutations = {
  setProducts(state, products) {
    state.products = products;
  },
  setSelectedProducts(state, data) {
    const { selected, previous, next } = data;

    state.selected = selected;
    state.previous = previous;
    state.next = next;
  },
  clearSelectedProducts(state) {
    state.previous = null;
    state.selected = null;
    state.next = null;
  },
  clearProducts(state) {
    state.previous = null;
    state.selected = null;
    state.next = null;
    state.products = [];
  },
};

export const getters = {
  products: (state) => {
    return state.products;
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
