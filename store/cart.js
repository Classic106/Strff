export const state = () => ({
  //cart: null,
  //token: null,
  order_items: [],
});

export const actions = {
  async add({ commit, state }, data) {
    //let cart = await this.$strapi.$http.$post("/order-items", data);
    //console.log(cart)
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
    const item = state.order_items.filter(
      (item) => item.product === order_item.product
    );
    if (!item.length) {
      state.order_items.push(order_item);
    }
  },
  removeProduct(state, id) {
    state.order_items = state.order_items.filter((item) => item.product !== id);
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
  numberOfItems(state) {
    return state.order_items.length;
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
