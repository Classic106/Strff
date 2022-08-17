export const state = () => ({
  articles: [],
});

export const mutations = {
  setArticles(state, articles) {
    state.articles = articles;
  },
};

export const getters = {
  articles: (state) => {
    return state.articles;
  },
};
