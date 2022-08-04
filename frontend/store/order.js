export const state = () => ({
  order_items: [],
  order_bundles: [],
  total: 0,
  order_status: 5,
});

export const actions = {
  async addOrder({ state, commit }, data = {}) {
    const order = {
      ...data,
      ...state,
      order_date: new Date(),
    };

    try {
      const result = await this.$strapi.create("orders", order);
      commit("setOrder", result);
    } catch (e) {
      console.log(e);
    }
  },
  async confirmOrder({ state, commit }, userInfo = {}) {
    const order = {
      ...state,
      ...userInfo,
      order_status: 7,
      order_date: new Date(),
    };

    //console.log(data);
    const result = await this.$strapi.$http.$put(`/orders/${state.id}`, order);
    console.log(result);
    //commit("clearOrder");
  },
  async addProduct({ commit, state }, order_item) {
    const item = state.order_items.filter(
      (item) => item.product.id === order_item.product.id
    );

    if (!item.length) {
      if (!state.id) {
        actions.addOrder.call(this, { commit, state });
        commit("setOrderCookie");
        order_item.order = state.id;
        const result = await this.$strapi.create("order-items", order_item);
        commit("addProduct", result);
      } else {
        order_item.order = state.id;
        const result = await this.$strapi.create("order-items", order_item);
        commit("addProduct", result);
      }
    }
  },
  async updateProduct({ commit }, order_item) {
    const result = await this.$strapi.$http.$put(
      `/order-items/${order_item.id}`,
      order_item
    );
    commit("updateProduct", result);
  },
  async removeProduct({ commit }, id) {
    this.$strapi.delete("order-items", { id });
    commit("removeProduct", id);
  },
  async addBundle({ commit, state }, bundle) {
    const item = state.order_bundles.filter(
      (item) => item.bundle.id === bundle.id
    );

    if (!item.length) {
      if (!state.id) {
        actions.addOrder.call(this, { commit, state });
        commit("setOrderCookie");
        const order_bundle = {
          order: state.id,
          bundle: bundle.id,
        };
        const result = await this.$strapi.create("order-bundles", order_bundle);
        commit("addBundle", result);
      } else {
        const order_bundle = {
          order: state.id,
          bundle: bundle.id,
        };
        const result = await this.$strapi.create("order-bundles", order_bundle);
        commit("addBundle", result);
      }
    }
  },
  async removeBundle({ commit }, id) {
    await this.$strapi.$http.$delete(`/order-bundles/${id}`);
    commit("removeBundle", id);
  },
};

export const mutations = {
  setOrderCookie(state) {
    this.$cookies.set("order", state.id);
  },
  setOrder(state, order) {
    state = Object.assign(state, order);
  },
  clearOrder(state) {
    state = Object.assign(state, {
      total: 0,
      order_items: [],
      order_bundles: [],
      order_status: 5,
    });
    this.$cookies.remove("order");
  },
  setTotal(state, total) {
    state.total = total;
  },
  async addProduct(state, order_item) {
    state.order_items.push(order_item);
  },
  updateProduct(state, order_item) {
    const index = state.order_items.findIndex(
      (item) => item.id === order_item.id
    );
    if (index !== -1) {
      const new_order_items = [...state.order_items];
      new_order_items[index] = order_item;
      state.order_items = new_order_items;
    }
  },
  removeProduct(state, id) {
    state.order_items = state.order_items.filter((item) => item.id !== id);
    this.$strapi.$http.$delete(`/order-items/${id}`);
  },
  addBundle(state, bundle) {
    state.order_bundles.push(bundle);
  },
  removeBundle(state, id) {
    state.order_bundles = state.order_bundles.filter((item) => item.id !== id);
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
