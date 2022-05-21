<template>
  <section class="container">
    <div>
      <h1 class="mt-2">Checkout</h1>
      <div class="grid md:grid-cols-1 mt-3">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Cart</h5>
              <p class="card-text">{{ numberOfItems }} item(s) selected:</p>
              <ul>
                <li v-for="item in cart.order_items" :key="item.id" class="card-text mb-2 flex items-center justify-between">
                  <span>Name: {{ item.product.title }} (${{ item.price | formatNumber }}) ({{ item.quantity }})</span>
                  <div>
                      <button @click="addToCart(item)"> + </button>
                      <button @click="removeFromCart(item)"> - </button>
                  </div>
                </li>
              </ul>
              <h5 class="card-text">Total: ${{ cart.total | formatNumber }}</h5>
              <p v-if="cart.order_items && !cart.order_items.length">Please select some items.</p>
            </div>
          </div>
      </div>
      <div class="grid md:grid-cols-1 mt-3">
          <form autocomplete="off" @submit.stop.prevent="handleSubmit">
            <div class="mb-2">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="address">
                    Address
                </label>
                <input id="address" type="text" placeholder="Enter your address" v-model="address" required autofocus="true" class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            </div>
            <div class="mb-2">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="postalCode">
                    Postal Code
                </label>
                <input id="postalCode" type="text" placeholder="Enter your postal code" v-model="postalCode" required autofocus="true" class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            </div>
            <div class="mb-2">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="city">
                    City
                </label>
                <input id="city" type="text" placeholder="Enter your city" v-model="city" required autofocus="true" class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            </div>
            <div class="mb-2">
                Card detail here
            </div>
            <button :disabled="loading" type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Submit
            </button>
          </form>
        </div>
    </div>
  </section>
</template>

<script>
//import { mapMutations } from 'vuex'
import '~/utils/filters'

export default {
  data() {
    return {
      address: '',
      postalCode: '',
      city: '',
      loading: false
    }
  },
  computed: {
    cart() {
      return this.$store.getters['cart/cart']
    },
    numberOfItems() {
      return this.$store.getters['cart/numberOfItems']
    }
  },
  methods: {
    async handleSubmit() {
      this.loading = true
      let token




      try {
        const response = await createToken()
        token = response.token.id
      } catch (err) {
        alert('An error occurred.')
        this.loading = false
        return
      }
      try {
        /* await this.$strapi.createEntry('orders', {
          amount: this.$store.getters['card/price'],
          dishes: this.$store.getters['card/items'],
          address: this.address,
          postalCode: this.postalCode,
          city: this.city,
          token
        }) */
        alert('Your order have been successfully submitted.')
        this.emptyCart()
        this.$router.push('/')
      } catch (err) {
        this.loading = false
        alert('An error occurred.')
      }
    },
    addToCart(item) {
        let selected = {
          productId: item.product.id,
          sizeId: item.size.id,
          quantity: 1,
          purchaseTypeId: item.purchase_type.id,
          subscriptionTypeId: item.subscription_type? item.subscription_type.id: null
        }
        this.$store.dispatch('cart/add', selected)
    },
    removeFromCart(item) {
        let selected = {
          productId: item.product.id,
          sizeId: item.size.id,
          quantity: 1,
          purchaseTypeId: item.purchase_type.id,
          subscriptionTypeId: item.subscription_type? item.subscription_type.id: null
        }
        this.$store.dispatch('cart/remove', selected)
    },
    emptyCart() {

    }
  }
}
</script>
<style lang="scss">
.card {
    border: 1px solid lightgray;
    border-radius: 5px;
    padding: 25px;
    margin: 0;

    .card-body {
        .card-title {
            font-size: 15px;
        }

        button {
            padding: 7px;
        }
    }
}
</style>