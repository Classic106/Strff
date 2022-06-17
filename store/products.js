export const state = () => ({
  products: [],
});

export const mutations = {
  setProducts(state, products) {
    state.products = products;
  },
};

export const getters = {
  products: (state) => {
    return state.products;
  },
};
