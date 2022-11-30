import { error } from "../utils/error";
import { success } from "../utils/success";

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
      error(e);
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
      success("Purchase type successfully created");
    } catch (e) {
      error(e);
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
      success("Purchase type successfully updated");
    } catch (e) {
      error(e);
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
      success("urchase type successfully deleted");
    } catch (e) {
      error(e);
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
      error(e);
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
      success("Subscription type successfully created");
    } catch (e) {
      error(e);
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
      success("Subscription type successfully updated");
    } catch (e) {
      error(e);
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
      success("Subscription type successfully deleted");
    } catch (e) {
      error(e);
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
