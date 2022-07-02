import cookieparser from "cookieparser";

export const actions = {
  async nuxtServerInit({ commit }, { req }) {
    let user = null;
    let token = null;
    let cart = null;

    if (req && req.headers && req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie);
      user = (parsed.user && JSON.parse(parsed.user)) || null;
      token = parsed.cart_token || null;
    }
    if (token == null && req.session.id) {
      token = req.session.id;
    }

    let s = await this.$strapi.find("order-statuses", { code: "cart" });
    if (s && s.length) {
      s = s[0];

      let query = null;
      if (user) {
        query = "order_status.id=" + s.id + "&user.id=" + user.id;
      } else {
        query = "order_status.id=" + s.id + "&cart_token=" + token;
      }
      cart = await this.$strapi.$http.$get("/cart/getcart?" + query);
    }

    commit("cart/setToken", token);
    commit("auth/setUser", user);
    commit("cart/setCart", cart);

    const categories = await this.$strapi.find("categories");
    const purchaseTypes = await this.$strapi.find("purchase-types");

    commit("categories/setCategories", categories);
    commit("purchase-types/setTypes", purchaseTypes);
  },
};
