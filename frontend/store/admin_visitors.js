import Vue from "vue";

export const state = () => ({
  visitors: [],
});

export const actions = {
  async getVisitors({ commit }) {
    try {
      const token = this.$cookies.get("token");

      const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await this.$axios.get(`/visitors`, headers);

      commit("setVisitors", data);
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
  setVisitors(state, visitors) {
    state.visitors = visitors;
  },
};

export const getters = {
  visitors(state) {
    return state.visitors;
  },
};
