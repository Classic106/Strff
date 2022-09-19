export const state = () => ({
  products: [],
  selectedProduct: null,
  currentPage: "home",
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
  setSelectedProduct(state, product) {
    state.selectedProduct = product;
  },
  setCurrentPage(state, page) {
    state.currentPage = page;
  },
};

export const getters = {
  products: (state) => {
    return state.products;
  },
  selectedProduct: (state) => {
    return state.selectedProduct;
  },
  currentPage: (state) => {
    return state.currentPage;
  },
};
