export const state = () => ({
    cart: null,
    token: null
})

export const actions = {
    async add({commit, state}, data) {
        if (data.quantity == null) {
            data.quantity = 1;
        }
        let currentUser = this.$cookies.get('user')
        data.userId = currentUser? currentUser.id: null
        data.cartToken = this.$cookies.get('cart_token')
        let cart = await this.$strapi.$http.$post('/cart/add', data)
        commit('setCart', cart)
    },
    async remove({commit, state}, data) {
        let currentUser = this.$cookies.get('user')
        data.userId = currentUser? currentUser.id: null
        data.cartToken = this.$cookies.get('cart_token')
        let cart = await this.$strapi.$http.$post('/cart/remove', data)
        commit('setCart', cart)
    },
    async empty({commit, state}) {
        let currentUser = this.$cookies.get('user')
        let data = {}
        data.userId = currentUser? currentUser.id: null
        data.cartToken = this.$cookies.get('cart_token')
        let cart = await this.$strapi.$http.$post('/cart/empty', data)
        commit('setCart', cart)
    },
    async release({commit, state}, data) {
        let currentUser = this.$cookies.get('user')
        data.userId = currentUser? currentUser.id: null
        data.cartToken = this.$cookies.get('cart_token')
        await this.$strapi.$http.$post('/cart/release', data)
        commit('setCart', null)
    },
    async syncByUser({commit, state}, userId) {
        let cart = null
        let s = await this.$strapi.find('order-statuses', { 'code': 'cart' })
        s = s[0]
        let c = await this.$strapi.find('orders', { 'order_status.id': s.id, 'user.id': userId })
        if (c && c.length) {
            cart = c[0]
        }
        commit('setCart', cart)
    }
}

export const mutations = {
    setCart (state, newCart) {
        if (newCart) {
            state.cart = {
                id: newCart.id,
                order_no: newCart.order_no,
                order_date: newCart.order_date,
                total: newCart.total,
                cart_token: newCart.cart_token,
                items: []
            }

            if (newCart.order_items) {
                for (let i = 0; i < newCart.order_items.length; i++) {
                    let d = {
                        product: {
                            id: newCart.order_items[i].product.id,
                            code: newCart.order_items[i].product.code,
                            title: newCart.order_items[i].product.title
                        },
                        quantity: newCart.order_items[i].quantity,
                        price: newCart.order_items[i].price,
                        total: newCart.order_items[i].total,
                        size: {
                            id: newCart.order_items[i].size.id,
                            title: newCart.order_items[i].size.title
                        },
                        purchase_type: {
                            id: newCart.order_items[i].purchase_type.id,
                            title: newCart.order_items[i].purchase_type.title
                        },
                        subscription_type: null
                    }
                    if (newCart.order_items[i].subscription_type) {
                        d.subscription_type = {
                            id: newCart.order_items[i].subscription_type.id,
                            title: newCart.order_items[i].subscription_type.title
                        }
                    }
                    state.cart.items.push(d)
                }
            }
            this.$cookies.set('cart', JSON.stringify(state.cart))
        } else {
            state.cart = null
            this.$cookies.set('cart', null)
        }
	},
    setToken (state, token) {
		state.token = token
        this.$cookies.set('cart_token', token)
	}
}

export const getters = {
    cart (state) {
        return state.cart
    },
    numberOfItems (state) {
        return state.cart? (state.cart.items.reduce((accumulator, item) => accumulator + item.quantity, 0)): 0
    },
    cartToken (state) {
        return state.token
    }
}