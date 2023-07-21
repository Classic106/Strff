import qs from "qs";
import { error } from "~/utils/error";

export const state = () => ({
  articles: [],
  article: null,
  total: 0,
});

export const actions = {
  async getArticles({ commit }, data) {
    try {
      let newData = data;

      if (!newData) {
        newData = {
          search: "",
          currentPage: 1,
          perPage: 3,
        };
      }

      const { search, currentPage, perPage } = newData;

      const queryData = {
        _start: (currentPage - 1) * perPage,
        _limit: perPage,
      };

      if (search) {
        queryData._or = [
          { article_containss: search },
          { title_containss: search },
        ];
      }
      const query = qs.stringify(queryData);

      const total = await this.$axios.get(`/articles/count?${query}`);
      const articles = await this.$axios.get(`/articles?${query}`);

      commit("setTotal", total.data);
      commit("setArticles", articles.data);
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
  setTotal(state, total) {
    state.total = total;
  },
  clearAll(state) {
    state.articles = [];
    state.article = null;
    state.total = 0;
  },
};

export const getters = {
  articles: (state) => {
    return state.articles;
  },
  article: (state) => {
    return state.article;
  },
  total(state) {
    return state.total;
  },
};
