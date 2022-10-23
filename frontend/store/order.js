export const state = () => ({
    order: {
        order_items: [],
        order_bundles: [],
        total: 0
    },
    token: null
})

export const actions = {
    async addProduct({commit, state}, data) {
        if (data.quantity == null) {
            data.quantity = 1;
        }
        let currentUser = this.$cookies.get('user');
        data.userId = currentUser? currentUser.id: null;
        data.orderToken = this.$cookies.get('order_token');
        let order = await this.$strapi.$http.$post('/orders/addproduct', data);
        commit('setOrder', order);
    },
    async removeProduct({commit, state}, data) {
        let currentUser = this.$cookies.get('user');
        data.userId = currentUser? currentUser.id: null;
        data.orderToken = this.$cookies.get('order_token');
        let order = await this.$strapi.$http.$post('/orders/removeproduct', data);
        commit('setOrder', order);
    },
    async updateItem({commit, state}, data) {
        await this.$strapi.$http.$post('/order/updateitem', data);
        let order = await this.$strapi.$http.$get('/order/getorder', { id: data.orderId});
        commit('setOrder', order);
    },
    async removeItem({commit, state}, data) {
        await this.$strapi.$http.$delete('/order-items/' + data.id);
        let order = await this.$strapi.$http.$get('/order/getorder', { id: data.order.id});
        commit('setOrder', order);
    },
    async clearOrder({commit, state}) {
        let currentUser = this.$cookies.get('user');
        let data = {};
        data.userId = currentUser? currentUser.id: null;
        data.orderToken = this.$cookies.get('order_token');
        let order = await this.$strapi.$http.$post('/orders/empty', data);
        commit('setOrder', order);
    },
    async placeOrder({commit, state}, data) {
        let currentUser = this.$cookies.get('user');
        data.userId = currentUser? currentUser.id: null;
        data.orderToken = this.$cookies.get('order_token');
        await this.$strapi.$http.$post('/orders/placeorder', data);
        commit('setOrder', null);
    },
    async syncByUser({commit, state}, userId) {
        let orderStatusPending = await this.$strapi.find('order-statuses', { 'code': 1 });
        orderStatusPending = orderStatusPending[0];
        let orders = await this.$strapi.find('orders', { 'order_status.id': orderStatusPending.id, 'user.id': userId });
        let order = orders && orders.length? orders[0]: null;
        commit('setOrder', order);
    }
}

export const mutations = {
    setOrder (state, order) {
        state.order = order;
        this.$cookies.set('order', JSON.stringify(state.order));
	},
    setToken (state, token) {
		state.token = token;
        this.$cookies.set('order_token', token, { path: '/', maxAge: 2147483647 });
	}
}

export const getters = {
    order (state) {
        return state.order;
    },
    orderItems(state) {
        return state.order? state.order.order_items: null;
    },
    orderBundles(state) {
        return state.order? state.order.order_bundles: null;
    },
    orderNoOfItems (state) {
        return state.order && state.order.order_items? (state.order.order_items.reduce((accumulator, item) => accumulator + item.quantity, 0)): 0;
    },
    orderBundleNoOfItems (state) {
        return state.order && state.order.order_bundles? (state.order.order_bundles.reduce((accumulator, item) => accumulator + item.quantity, 0)): 0;
    },
    orderTotal(state) {
        return state.order? state.order.total: 0;
    },
    orderToken (state) {
        return state.token;
    }
}