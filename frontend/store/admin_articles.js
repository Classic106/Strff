import Vue from "vue";
import qs from "qs";

export const state = () => ({
  total: 0,
  params: {
    sort: {
      field: "",
      type: "none",
    },
    search: "",
    page: 1,
    currentPerPage: 10,
  },
  articles: [],
  selected: null,
  next: null,
  previous: null,
});

export const actions = {
  async getArticles({ commit, state }) {
    try {
      const { sort, search, page, currentPerPage } = state.params;
      const { field, type } = sort;

      const queryData = {
        _start: (page - 1) * currentPerPage,
        _limit: currentPerPage,
      };

      if (sort && type !== "none") {
        queryData._sort = `${field}:${type.toUpperCase()}`;
      }

      if (search) {
        queryData._or = [
          { name_containss: search },
          { title_containss: search },
        ];
      }

      const query = qs.stringify(queryData);

      const total = await this.$axios.get(`/articles/count?${query}`);
      const articles = await this.$axios.get(`/articles?${query}`);

      commit("setTotal", total.data);
      commit("setArticles", articles.data);
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
  async createArticle({ commit }, article) {
    try {
      const token = this.$cookies.get("token");

      const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { image } = article;

      const formData = new FormData();

      if (image) {
        formData.append("files", image[0], image[0].name);
      }

      const { data } = await this.$axios
        .post("/upload", formData, headers)
        .then(({ data }) => data[0].id)
        .then((id) => {
          debugger;
          article.image = id;
          article.date = new Date();

          //return this.$axios.post(`/articles`, article, headers);
        });

      commit("addArticle", data);
      Vue.notify({
        group: "all",
        type: "success",
        text: "Article successfully created",
      });
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
  async updateArticle({ commit }, article) {
    try {
      const token = this.$cookies.get("token");

      const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { id, image } = article;

      let newImage;
      debugger;
      if (image && typeof image !== "string" && image[0]) {
        const formData = new FormData();
        formData.append("files", image[0], image[0].name);

        newImage = await this.$axios
          .post("/upload", formData, headers)
          .then(({ data }) => data[0].id);
      }
      debugger;
      const updatedArticle = { ...article, image: newImage || image };
      debugger;
      const { data } = await this.$axios.put(
        `/articles/${id}`,
        updatedArticle,
        headers
      );
      debugger;
      commit("updateArticle", data);
      Vue.notify({
        group: "all",
        type: "success",
        text: "Article successfully updated",
      });
    } catch (e) {
      console.log(e);
      const { data } = e.response;
      const messge = data.message[0].messages[0].id;
      Vue.notify({
        group: "all",
        type: "error",
        text: messge,
      });
    }
  },
  async deleteArticles({ commit }, ids) {
    try {
      const token = this.$cookies.get("token");

      const { data } = await this.$axios.delete(`/article/${ids}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      commit("deleteArticle", ids);
      commit("clearSelectedArticles");
      Vue.notify({
        group: "all",
        type: "success",
        text: "Article(s) successfully deleted",
      });
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
  setTotal(state, total) {
    state.total = total;
  },
  setParams(state, params) {
    state.params = params;
  },
  setArticles(state, articles) {
    state.articles = articles;
  },
  setSelectedArticles(state, data) {
    const { selected, previous, next } = data;

    state.selected = selected;
    state.previous = previous;
    state.next = next;
  },
  addArticle(state, article) {
    state.articles.push(article);
  },
  updateArticle(state, article) {
    const index = state.articles.findIndex((p) => p.id === article.id);
    state.articles[index] = article;
    state.selected = article;
  },
  deleteArticles(state, ids) {
    const newArticles = state.articles.reduce((acc, item) => {
      if (!ids.includes(item.id)) {
        acc.push(item);
      }
      return acc;
    }, []);
    state.articles = newArticles;
  },
  clearSelectedArticles(state) {
    state.previous = null;
    state.selected = null;
    state.next = null;
  },
  clearArticles(state) {
    state.previous = null;
    state.selected = null;
    state.next = null;
    state.articles = [];
    state.params = {
      sort: {
        field: "",
        type: "none",
      },
      search: "",
      page: 1,
      currentPerPage: 10,
    };
  },
};

export const getters = {
  total(state) {
    return state.total;
  },
  params(state) {
    return state.params;
  },
  articles: (state) => {
    return state.articles;
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
