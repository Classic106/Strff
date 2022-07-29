export const state = () => ({
  order_items: [],
  order_bundles: [],
});

export const actions = {
  async addOrder({ state }, data = {}) {
    const order = {
      ...data,
      order_items: state.order_items.map((item) => item.id),
      bundle_items: state.order_bundles.map((item) => item.id),
      order_date: new Date(),
    };

    try {
      await this.$strapi.create("orders", order);
      commit("clearAll");
    } catch (e) {
      console.log(e);
    }
  },
  async addProduct({ commit, state }, order_item) {
    const item = state.order_items.filter(
      (item) => item.product.id === order_item.product.id
    );

    if (!item.length) {
      const result = await this.$strapi.$http.$post("/order-items", order_item);
      const product = await this.$strapi.find("products", {
        id: result.product.id,
      });
      result.product = product[0];
      commit("addProduct", result);
    }
  },
  async updateProduct({ commit }, order_item) {
    try {
      const result = await this.$strapi.update(
        "order-items",
        order_item.id,
        order_item
      );
      commit("updateProduct", result);
    } catch (e) {
      console.log(e);
    }
  },
  async removeProduct({ commit }, id) {
    try {
      const result = await this.$strapi.delete("order-items", id);
      commit("removeProduct", result.id);
    } catch (e) {
      console.log(e);
    }
  },
  async addBundle({ commit, state }, order_bundle) {
    const item = state.order_bundles.filter(
      (item) => item.id === order_bundle.id
    );

    if (!item.length) {
      const result = await this.$strapi.$http.$post("/order-bundles", {
        bundle: order_bundle.id,
      });
      result.bundle = order_bundle;
      commit("addBundle", result);
    }
  },
  async removeBundle({ commit }, id) {
    try {
      const result = await this.$strapi.delete("order-bundles", id);
      commit("removeBundle", result.id);
    } catch (e) {
      console.log(e);
    }
  },
};

export const mutations = {
  addProduct(state, order_item) {
    state.order_items.push(order_item);
  },
  updateProduct(state, newItem) {
    const index = state.order_items.findIndex((item) => item.id === newItem.id);
    if (index !== -1) {
      const new_order_items = [...state.order_items];
      new_order_items[index] = newItem;
      state.order_items = new_order_items;
    }
  },
  removeProduct(state, id) {
    state.order_items = state.order_items.filter((item) => item.id !== id);
  },
  addBundle(state, bundle) {
    state.order_bundles.push(bundle);
  },
  removeBundle(state, id) {
    state.order_bundles = state.order_bundles.filter((item) => item.id !== id);
  },
  clearAll(state) {
    state.order_bundles = [];
    state.order_items = [];
  },
};

export const getters = {
  getOrderItems(state) {
    return state.order_items;
  },
  getBundleItems(state) {
    return state.order_bundles;
  },
  numberOfItems(state) {
    return state.order_items.length + state.order_bundles.length;
  },
};
