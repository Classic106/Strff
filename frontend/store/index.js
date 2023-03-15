import cookieparser from "cookieparser";
import { convertObjectToQueryUrl } from '~/utils/functions';

export const actions = {
  async nuxtServerInit({ state, commit, dispatch }, { req }) {
    let user = null;
    let order = null;
    let order_token = null;
    let user_token = null;

    if (req && req.headers && req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie);
      order_token = parsed.order_token || null;
      user_token = parsed.token || null;
    }

    if (user_token) {
      await dispatch("auth/loginByToken");
      const { auth } = state;
      user = auth.user;
    }

    if (order_token == null && req.session.id) {
      order_token = req.session.id;
    }

    let orderStatusPending = await this.$strapi.find("order-statuses", {
      code: 1,
    });

    if (orderStatusPending && orderStatusPending.length) {
      orderStatusPending = orderStatusPending[0];
      let options = {};

      if (user && user.role.type === "customer") {
        options = {
          "order_status.id": orderStatusPending.id,
          "user.id": user.id,
        };
      } else {
        options = {
          "order_status.id": orderStatusPending.id,
          order_token,
        };
      }
      order = await this.$strapi.$http.$get(
        "/order/getorder?" + convertObjectToQueryUrl(options)
      );
    }

    commit("order/setToken", order_token);
    commit("order/setOrder", order);

    await dispatch("best_sellers/getBestSellers");
    await dispatch("categories/getCategories");
    await dispatch("articles/getArticles");
    await dispatch("purchase-types/getPurchaseTypes");
  },
};
