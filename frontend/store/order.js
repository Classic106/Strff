export const state = () => ({
  order_items: [],
  order_bundles: [],
  total: 0,
});

export const actions = {
  async addOrder({ state }, data = {}) {
    const order = {
      ...data,
      ...state,
      order_date: new Date(),
    };

    try {
      await this.$strapi.create("orders", order);
      commit("clearOrder");
    } catch (e) {
      console.log(e);
    }
  },
  async addProduct({ commit, state }, order_item) {
    const item = state.order_items.filter(
      (item) => item.product.id === order_item.product
    );

    if (!item.length) {
      const result = await this.$strapi.findOne("products", order_item.product);
      order_item.product = result;
      commit("addProduct", order_item);
    }
  },
  /*async updateProduct({ commit }, order_item) {
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
  },*/
};

export const mutations = {
  setOrder(state, order) {
    state = Object.assign(state, order);
  },
  clearOrder(state) {
    state = Object.assign(state, {
      total: 0,
      order_items: [],
      order_bundles: [],
    });

    this.$cookies.set("order", JSON.stringify(state));
  },
  setTotal(state, total) {
    state.total = total;
    this.$cookies.set("order", JSON.stringify(state));
  },
  addProduct(state, order_item) {
    state.order_items.push(order_item);
    this.$cookies.set("order", JSON.stringify(state));
  },
  updateProduct(state, newItem) {
    const index = state.order_items.findIndex((item) => item.id === newItem.id);
    if (index !== -1) {
      const new_order_items = [...state.order_items];
      new_order_items[index] = newItem;
      state.order_items = new_order_items;
      this.$cookies.set("order", JSON.stringify(state));
    }
  },
  removeProduct(state, id) {
    state.order_items = state.order_items.filter((item) => item.id !== id);
    this.$cookies.set("order", JSON.stringify(state));
  },
  addBundle(state, bundle) {
    state.order_bundles.push(bundle);
    this.$cookies.set("order", JSON.stringify(state));
  },
  removeBundle(state, id) {
    state.order_bundles = state.order_bundles.filter((item) => item.id !== id);
    this.$cookies.set("order", JSON.stringify(state));
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
  getTotal(state) {
    return state.total;
  },
};
