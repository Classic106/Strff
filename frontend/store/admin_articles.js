import qs from "qs";
import { error } from "~/utils/error";
import { success } from "~/utils/success";

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

      const token = this.$cookies.get("token");

      const queryData = {
        _start: (page - 1) * currentPerPage,
        _limit: currentPerPage,
        _publicationState: token ? "preview" : "live",
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
      error(e);
    }
  },
  async createArticle({ commit }, article) {
    try {
      const { image } = article;

      let newArticle;

      if (image && typeof image !== "string" && image[0]) {
        const formData = new FormData();
        formData.append("files", image[0], image[0].name);

        newArticle = await this.$axios
          .post("/upload", formData)
          .then(({ data }) => data[0].id)
          .then(async (image) => {
            const { data } = await this.$axios.post(`/articles`, {
              ...article,
              date: new Date(),
              image,
            });
            return data;
          });
      } else {
        const { data } = await this.$axios.post(`/articles`, {
          ...article,
          date: new Date(),
        });
        newArticle = data;
      }

      commit("addArticle", newArticle);
      success("Article successfully created");
    } catch (e) {
      error(e);
    }
  },
  async updateArticle({ commit }, article) {
    try {
      const { id, image } = article;

      let updatedArticle;

      if (image && typeof image !== "string" && image[0]) {
        const formData = new FormData();
        formData.append("files", image[0], image[0].name);

        updatedArticle = await this.$axios
          .post("/upload", formData)
          .then(({ data }) => data[0].id)
          .then(async (image) => {
            const { data } = await this.$axios.put(`/articles/${id}`, {
              ...article,
              image,
            });
            return data;
          });
      } else {
        const { data } = await this.$axios.put(`/articles/${id}`, {
          ...article,
          image: (image && image.id) || null,
        });
        updatedArticle = data;
      }

      commit("updateArticle", updatedArticle);
      success("Article successfully updated");
    } catch (e) {
      error(e);
    }
  },
  async deleteArticles({ commit }, ids) {
    try {
      const { data } = await this.$axios.delete(`/articles/${ids}`);

      commit("deleteArticles", ids);
      commit("clearSelectedArticles");
      success("Article(s) successfully deleted");
    } catch (e) {
      error(e);
    }
  },
  async statusArticles({ dispatch }, { articles, status }) {
    try {
      const result = await Promise.all(
        articles.map(async ({ id }) => {
          const article = {
            id,
            published_at: status === "publish" ? new Date() : null,
          };
          return await this.$axios.put(`/articles/${id}`, article);
        })
      );
      dispatch("getArticles");
    } catch (e) {
      error(e);
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
