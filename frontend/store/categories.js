import { error } from "../utils/error";
import { success } from "../utils/success";

export const state = () => ({
  categories: [],
});

export const actions = {
  async getCategories({ commit }) {
    try {
      const { data } = await this.$axios.get(`/categories`);

      commit("setCategories", data);
    } catch (e) {
      error(e);
    }
  },
  async createCategory({ commit }, body) {
    try {
      const token = this.$cookies.get("token");

      const { data } = await this.$axios.post(`/categories`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      commit("addCategory", data);
      success("Category successfully created");
    } catch (e) {
      error(e);
    }
  },
  async updateCategory({ commit }, { id, body }) {
    try {
      const token = this.$cookies.get("token");

      const { data } = await this.$axios.put(`/categories/${id}`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      commit("updateCategory", data);
      success("Category successfully updated");
    } catch (e) {
      error(e);
    }
  },
  async deleteCategory({ commit }, id) {
    try {
      const token = this.$cookies.get("token");

      const { data } = await this.$axios.delete(`/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      commit("deleteCategory", id);
      success("Category successfully deleted");
    } catch (e) {
      error(e);
    }
  },
};

export const mutations = {
  setCategories(state, categories) {
    state.categories = categories;
  },
  addCategory(state, category) {
    state.categories.push(category);
  },
  updateCategory(state, category) {
    const index = state.categories.findIndex((c) => c.id === category.id);
    state.categories[index] = category;
  },
  deleteCategory(state, id) {
    const newCategories = state.categories.filter((c) => c.id !== id);
    state.categories = newCategories;
  },
};

export const getters = {
  categories: (state) => {
    return state.categories;
  },
};
