import Vue from "vue";

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
      const { data } = e.response;
      const messge = data.message[0].messages[0].id;
      Vue.notify({
        group: "all",
        type: "error",
        text: messge,
      });
    }
  },
  async getArticle({ commit }, id) {
    try {
      const { data } = await this.$axios.get(`/articles/${id}`);

      data.date = new Date(data.date);
      commit("setArticle", data);
    } catch (e) {
      const { data } = e.response;
      const messge = data.message[0].messages[0].id;
      Vue.notify({
        group: "all",
        type: "error",
        text: messge,
      });
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
