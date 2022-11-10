import Vue from "vue";

export const state = () => ({
  types: [],
  subscription_types: [],
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
  async createPurchaseType({ commit }, purchaseType) {
    try {
      const token = this.$cookies.get("token");

      const { data } = await this.$axios.post(`/purchase-types`, purchaseType, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      commit("addPurchaseType", data);
      Vue.notify({
        group: "all",
        type: "success",
        text: "Purchase type successfully created",
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
  async updatePurchaseType({ commit }, purchaseType) {
    try {
      const token = this.$cookies.get("token");

      const { id } = purchaseType;
      const { data } = await this.$axios.put(
        `/purchase-types/${id}`,
        purchaseType,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      commit("updatePurchaseType", data);
      Vue.notify({
        group: "all",
        type: "success",
        text: "Purchase type successfully updated",
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
  async deletePurchaseType({ commit }, id) {
    try {
      const token = this.$cookies.get("token");

      const { data } = await this.$axios.delete(`/purchase-types/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      commit("deletePurchaseType", id);
      Vue.notify({
        group: "all",
        type: "success",
        text: "urchase type successfully deleted",
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
  async getSubscriptionTypes({ commit }) {
    try {
      const token = this.$cookies.get("token");

      const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await this.$axios.get(`/subscription-types`, headers);

      commit("setSubscriptionTypes", data);
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
  async createSubscriptionType({ commit }, body) {
    try {
      const token = this.$cookies.get("token");

      const { data } = await this.$axios.post(`/subscription-types`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      commit("addSubscriptionType", data);
      Vue.notify({
        group: "all",
        type: "success",
        text: "Subscription type successfully created",
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
  async updateSubscriptionType({ commit }, { id, body }) {
    try {
      const token = this.$cookies.get("token");

      const { data } = await this.$axios.put(
        `/subscription-types/${id}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("updateSubscriptionType", data);
      Vue.notify({
        group: "all",
        type: "success",
        text: "Subscription type successfully updated",
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
  async deleteSubscriptionType({ commit }, id) {
    try {
      const token = this.$cookies.get("token");

      const { data } = await this.$axios.delete(`/subscription-types/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      commit("deleteSubscriptionType", id);
      Vue.notify({
        group: "all",
        type: "success",
        text: "Subscription type successfully deleted",
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
  setTypes(state, types) {
    state.types = types;
  },
  addPurchaseType(state, type) {
    state.types.push(type);
  },
  updatePurchaseType(state, type) {
    const index = state.types.findIndex((item) => item.id === type.id);
    if (index !== -1) {
      state.types[index] = type;
    }
  },
  deletePurchaseType(state, id) {
    const newTypes = state.types.filter((item) => item.id !== id);
    state.types = newTypes;
  },
  setSubscriptionTypes(state, types) {
    state.subscription_types = types;
  },
  addSubscriptionType(state, type) {
    state.subscription_types.push(type);
  },
  updateSubscriptionType(state, type) {
    const index = state.subscription_types.findIndex(
      (item) => item.id === type.id
    );
    if (index !== -1) {
      state.subscription_types[index] = type;
    }
  },
  deleteSubscriptionType(state, id) {
    const newTypes = state.subscription_types.filter((item) => item.id !== id);
    state.subscription_types = newTypes;
  },
};

export const getters = {
  getTypes(state) {
    return state.types;
  },
  subscriptionTypes(state) {
    return state.subscription_types;
  },
};
