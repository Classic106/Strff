export const state = () => ({
  currentPage: "home",
});

export const mutations = {
  setCurrentPage(state, page) {
    state.currentPage = page;
  },
};

export const getters = {
  currentPage: (state) => {
    return state.currentPage;
  },
};
