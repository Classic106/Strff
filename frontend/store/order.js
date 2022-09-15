export const state = () => ({
  orderItems: [],
  orderBundles: [],
  total: 0,
  orderStatus: 5,
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
      commit("setOrderCookie");
    } catch (e) {
      console.log(e);
    }
  },
  async confirmOrder({ state, commit }, userInfo = {}) {
    const order = {
      ...state,
      ...userInfo,
      orderStatus: 7,
      order_date: new Date(),
    };

    const result = await this.$strapi.$http.$put(`/orders/${state.id}`, order);
    commit("clearOrder");
  },
  async addProduct({ commit, state }, order_item) {
    const item = state.orderItems.filter(
      (item) => item.product.id === order_item.product.id
    );

    if (!item.length) {
      if (!state.id) {
        await actions.addOrder.call(this, { commit, state });
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
    await this.$strapi.$http.$delete(`/order-items/${id}`);
    commit("removeProduct", id);
  },
  async addBundle({ commit, state }, bundle) {
    const item = state.orderBundles.filter(
      (item) => item.bundle.id === bundle.id
    );

    if (!item.length) {
      if (!state.id) {
        await actions.addOrder.call(this, { commit, state });
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
      orderItems: [],
      orderBundles: [],
      orderStatus: 5,
    });
    this.$cookies.remove("order");
  },
  setTotal(state, total) {
    state.total = total;
  },
  async addProduct(state, order_item) {
    state.orderItems.push(order_item);
  },
  updateProduct(state, order_item) {
    const index = state.orderItems.findIndex(
      (item) => item.id === order_item.id
    );
    if (index !== -1) {
      const new_order_items = [...state.orderItems];
      new_order_items[index] = order_item;
      state.orderItems = new_order_items;
    }
  },
  removeProduct(state, id) {
    state.orderItems = state.orderItems.filter((item) => item.id !== id);
  },
  addBundle(state, bundle) {
    state.orderBundles.push(bundle);
  },
  removeBundle(state, id) {
    state.orderBundles = state.orderBundles.filter((item) => item.id !== id);
  },
};

export const getters = {
  getOrderItems(state) {
    return state.orderItems;
  },
  getBundleItems(state) {
    return state.orderBundles;
  },
  numberOfItems(state) {
    return state.orderItems.length + state.orderBundles.length;
  },
  getTotal(state) {
    return state.total;
  },
};
