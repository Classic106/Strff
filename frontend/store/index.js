import cookieparser from "cookieparser";
import { convertObjectToQueryUrl } from '~/utils/functions';

export const actions = {
  async nuxtServerInit({ commit }, { req }) {
    let user = null;
    let order = null;
    let token = null;

    if (req && req.headers && req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie);
      user = (parsed.user && JSON.parse(parsed.user)) || null;
      token = parsed.order_token || null;
    }
    if (token == null && req.session.id) {
        token = req.session.id;
    }

    let orderStatusPending = await this.$strapi.find('order-statuses', { 'code': 1 });
    if (orderStatusPending && orderStatusPending.length) {
        orderStatusPending = orderStatusPending[0];
        let options = {};
        if (user) {
            options = { 'order_status.id': orderStatusPending.id, 'user.id': user.id };
        } else {
            options = { 'order_status.id': orderStatusPending.id, 'order_token': token };
        }
        order = await this.$strapi.$http.$get('/order/getorder?' + convertObjectToQueryUrl(options));
    }

    console.log('Token: ', token);

    commit('order/setToken', token);
    commit('auth/setUser', user);
    commit('order/setOrder', order);
  }
};
