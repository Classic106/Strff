export const state = () => ({
  cart: null,
  token: null,
  order_items: [],
  order_bundles: [],
});

export const actions = {
  async addOrder({ commit, state }, data = {}) {
    const order = {
      ...data,
      order_items: state.order_items.map((item) => item.id),
      bundle_items: state.order_bundles.map((item) => item.id),
      order_date: new Date(),
    };

    try {
      const result = await this.$strapi.create("orders", order);
    } catch (e) {
      console.log(e);
    }
  },
  async addProduct({ commit, state }, order_item) {
    const item = state.order_items.filter(
      (item) => item.product.id === order_item.product
    );

    if (!item.length) {
      const result = await this.$strapi.$http.$post("/order-items", order_item);
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
  /*async add({ commit, state }, data) {
    if (data.quantity == null) {
      data.quantity = 1;
    }
    let currentUser = this.$cookies.get("user");
    data.userId = currentUser ? currentUser.id : null;
    data.cartToken = this.$cookies.get("cart_token");
    let cart = await this.$strapi.$http.$post("/cart/add", data);
    commit("setCart", cart);
  },
  async remove({ commit, state }, data) {
    let currentUser = this.$cookies.get("user");
    data.userId = currentUser ? currentUser.id : null;
    data.cartToken = this.$cookies.get("cart_token");
    let cart = await this.$strapi.$http.$post("/cart/remove", data);
    commit("setCart", cart);
  },
  async syncByUser({ commit, state }, userId) {
    let cart = null;
    let c = await this.$strapi.find("orders", {
      "order_status.id": 1,
      "user.id": userId,
    });
    if (c && c.length) {
      cart = c[0];
    }
    commit("setCart", cart);
  },*/
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
    console.log(state.order_bundles);
  },
  removeBundle(state, id) {
    state.order_bundles = state.order_bundles.filter((item) => item.id !== id);
  },
  /*setCart(state, newCart) {
    if (newCart) {
      state.cart = {
        id: newCart.id,
        order_no: newCart.order_no,
        order_date: newCart.order_date,
        total: newCart.total,
        cart_token: newCart.cart_token,
        order_items: [],
      };

      if (newCart.order_items) {
        for (let i = 0; i < newCart.order_items.length; i++) {
          let d = {
            product: {
              id: newCart.order_items[i].product.id,
              title: newCart.order_items[i].product.title,
            },
            quantity: newCart.order_items[i].quantity,
            price: newCart.order_items[i].price,
            total: newCart.order_items[i].total,
            size: {
              id: newCart.order_items[i].size.id,
              title: newCart.order_items[i].size.title,
            },
            purchase_type: {
              id: newCart.order_items[i].purchase_type.id,
              title: newCart.order_items[i].purchase_type.title,
            },
            subscription_type: null,
          };
          if (newCart.order_items[i].subscription_type) {
            d.subscription_type = {
              id: newCart.order_items[i].subscription_type.id,
              title: newCart.order_items[i].subscription_type.title,
            };
          }
          state.cart.order_items.push(d);
        }
      }
      this.$cookies.set("cart", state.cart ? JSON.stringify(state.cart) : null);
    } else {
      this.$cookies.set("cart", null);
    }
  },
  setToken(state, token) {
    state.token = token;
    this.$cookies.set("cart_token", token);
  },*/
};

export const getters = {
  cart(state) {
    return state.cart;
  },
  getOrderItems(state) {
    return state.order_items;
  },
  getBundleItems(state) {
    return state.order_bundles;
  },
  numberOfItems(state) {
    return state.order_items.length + state.order_bundles.length;
    /*return state.cart
      ? state.cart.order_items.reduce(
          (accumulator, item) => accumulator + item.quantity,
          0
        )
      : 0;*/
  },
  cartToken(state) {
    return state.token;
  },
};
