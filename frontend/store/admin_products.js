export const state = () => ({
  products: [],
  selected: null,
  next: null,
  previous: null,
});

export const actions = {
  async getProducts({ commit }) {
    try {
      const result = await this.$strapi.find("products");
      commit("setProducts", result);
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
  setNextProduct(state, product) {
    state.nextProduct = product;
  },
  clearProducts(state) {
    state.previous = null;
    state.selected = null;
    state.next = null;
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