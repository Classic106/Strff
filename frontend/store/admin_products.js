export const state = () => ({
  products: [],
  selectedProduct: null,
  nextProduct: null,
  previousProduct: null,
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
    const { selectedProduct, previousProduct, nextProduct } = data;

    state.selectedProduct = selectedProduct;
    state.previousProduct = previousProduct;
    state.nextProduct = nextProduct;
  },
  setNextProduct(state, product) {
    state.nextProduct = product;
  },
  clearProducts(state) {
    state.previousProduct = null;
    state.selectedProduct = null;
    state.nextProduct = null;
  },
};

export const getters = {
  products: (state) => {
    return state.products;
  },
  selectedProduct: (state) => {
    return state.selectedProduct;
  },
  nextProduct: (state) => {
    return state.nextProduct;
  },
  previousProduct: (state) => {
    return state.previousProduct;
  },
  currentPage: (state) => {
    return state.currentPage;
  },
};
