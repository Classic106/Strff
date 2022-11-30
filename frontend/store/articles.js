import { error } from "../utils/error";

export const state = () => ({
  articles: [],
  article: null,
});

export const actions = {
  async getArticles({ commit }) {
    try {
      const { data } = await this.$axios.get(`/articles`);

      commit("setArticles", data);
    } catch (e) {
      error(e);
    }
  },
  async getArticle({ commit }, id) {
    try {
      const { data } = await this.$axios.get(`/articles/${id}`);

      data.date = new Date(data.date);
      commit("setArticle", data);
    } catch (e) {
      error(e);
    }
  },
};

export const mutations = {
  setArticles(state, articles) {
    state.articles = articles;
  },
  setArticle(state, article) {
    state.article = article;
  },
};

export const getters = {
  articles: (state) => {
    return state.articles;
  },
  article: (state) => {
    return state.article;
  },
};
