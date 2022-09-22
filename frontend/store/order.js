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
        data.cartToken = this.$cookies.get('cart_token');
        let order = await this.$strapi.$http.$post('/orders/addproduct', data);
        commit('setOrder', order);
    },
    async removeProduct({commit, state}, data) {
        let currentUser = this.$cookies.get('user');
        data.userId = currentUser? currentUser.id: null;
        data.cartToken = this.$cookies.get('cart_token');
        let order = await this.$strapi.$http.$post('/orders/removeproduct', data);
        commit('setOrder', order);
    },
    async clearOrder({commit, state}) {
        let currentUser = this.$cookies.get('user');
        let data = {};
        data.userId = currentUser? currentUser.id: null;
        data.cartToken = this.$cookies.get('cart_token');
        let order = await this.$strapi.$http.$post('/orders/empty', data);
        commit('setOrder', order);
    },
    async placeOrder({commit, state}, data) {
        let currentUser = this.$cookies.get('user');
        data.userId = currentUser? currentUser.id: null;
        data.cartToken = this.$cookies.get('cart_token');
        await this.$strapi.$http.$post('/orders/placeorder', data);
        commit('setOrder', null);
    },
    async syncByUser({commit, state}, userId) {
        let order = null;
        let s = await this.$strapi.find('order-statuses', { 'code': 'order' });
        s = s[0];
        let c = await this.$strapi.find('orders', { 'order_status.id': s.id, 'user.id': userId });
        if (c && c.length) {
            order = c[0];
        }
        commit('setOrder', order);
    }
}

export const mutations = {
    setOrder (state, newOrder) {
        if (newOrder) {
            state.order = {
                id: newOrder.id,
                order_no: newOrder.order_no,
                order_date: newOrder.order_date,
                total: newOrder.total,
                cart_token: newOrder.cart_token,
                items: []
            };

            if (newOrder.order_items) {
                for (let i = 0; i < newOrder.order_items.length; i++) {
                    let d = {
                        product: {
                            id: newOrder.order_items[i].product.id,
                            code: newOrder.order_items[i].product.code,
                            title: newOrder.order_items[i].product.title
                        },
                        quantity: newOrder.order_items[i].quantity,
                        price: newOrder.order_items[i].price,
                        total: newOrder.order_items[i].total,
                        size: {
                            id: newOrder.order_items[i].size.id,
                            title: newOrder.order_items[i].size.title
                        },
                        purchase_type: {
                            id: newOrder.order_items[i].purchase_type.id,
                            title: newOrder.order_items[i].purchase_type.title
                        },
                        subscription_type: null
                    };
                    if (newOrder.order_items[i].subscription_type) {
                        d.subscription_type = {
                            id: newOrder.order_items[i].subscription_type.id,
                            title: newOrder.order_items[i].subscription_type.title
                        };
                    }
                    state.order.items.push(d);
                }
            }
            this.$cookies.set('order', JSON.stringify(state.order));
        } else {
            state.order = null;
            this.$cookies.set('order', null);
        }
	},
    setToken (state, token) {
		state.token = token;
        this.$cookies.set('cart_token', token);
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
        return state.order.order_items? (state.order.order_items.reduce((accumulator, item) => accumulator + item.quantity, 0)): 0;
    },
    orderBundleNoOfItems (state) {
        return state.order.order_bundles? (state.order.order_bundles.reduce((accumulator, item) => accumulator + item.quantity, 0)): 0;
    },
    orderTotal(state) {
        return state.order? state.order.total: 0;
    },
    cartToken (state) {
        return state.token;
    }
}