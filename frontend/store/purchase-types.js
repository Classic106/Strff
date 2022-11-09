import Vue from "vue";

export const state = () => ({
  types: [],
});

export const actions = {
  async getPurchaseTypes({ commit }) {
    try {
      const { data } = await this.$axios.get(`/purchase-types`);

      commit("setTypes", data);
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
  setTypes(state, types) {
    state.types = types;
  },
};

export const getters = {
  getTypes(state) {
    return state.types;
  },
};
