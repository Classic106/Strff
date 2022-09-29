import cookieparser from "cookieparser";

export const actions = {
  async nuxtServerInit({ commit }, { req }) {
    let user = null;
    let order = null;
    let token = null;

    /* let userInfo = {};

    if (req && req.headers && req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie);
      user = (parsed.user && JSON.parse(parsed.user)) || null;
      order = parsed.order || null;
      userInfo = parsed.user_info || {};
    }

    if (order !== null) {
      try {
        const data = await this.$strapi.findOne("orders", JSON.parse(order));
        commit("order/setOrder", data);
      } catch (e) {
        this.$cookies.remove("order");
      }
    }

    if (Object.keys(userInfo).length) {
      commit("userInfo/setUserInfo", JSON.parse(userInfo));
    } */

    if (req && req.headers && req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      user = (parsed.user && JSON.parse(parsed.user)) || null
      token = parsed.order_token || null
    }
    if (token == null && req.session.id) {
        token = req.session.id
    }

    let orderStatusPending = await this.$strapi.find('order-statuses', { 'code': 1 });
    if (orderStatusPending && orderStatusPending.length) {
        orderStatusPending = orderStatusPending[0];
        let query = null;
        if (user) {
            query = 'order_status.id=' + orderStatusPending.id + '&user.id=' + user.id;
        } else {
            query = 'order_status.id=' + orderStatusPending.id + '&order_token=' + token;
        }
        order = await this.$strapi.find('orders', query);
        if (order && order.length) {
            order = order[0];
        }
    }

    const categories = await this.$strapi.find('categories');
    const articles = await this.$strapi.find('articles');
    const purchaseTypes = await this.$strapi.find('purchase-types');

    commit('order/setToken', token);
    commit('auth/setUser', user);
    commit('order/setOrder', order);
    commit('categories/setCategories', categories);
    commit('articles/setArticles', articles);
    commit('purchase-types/setTypes', purchaseTypes);
  }
};
