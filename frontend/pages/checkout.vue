<template>
  <section class="container">
    <div>
      <div v-if="orderNoOfItems">
        <h1 class="mt-5">Checkout</h1>
        <div class="grid md:grid-cols-1 mt-3">
            <div class="card">
                <div class="card-body">
                <h5 class="card-title">Cart</h5>
                <p class="card-text">{{ orderNoOfItems }} item(s) selected:</p>
                <ul>
                    <li v-for="item in orderItems" :key="item.id" class="card-text mb-2 flex items-center justify-between">
                    <span>Name: {{ item.product.title }} (${{ item.price | formatNumber }}) ({{ item.quantity }})</span>
                    <div>
                        <button @click="addToCart(item)"> + </button>
                        <button @click="removeFromCart(item)"> - </button>
                    </div>
                    </li>
                </ul>
                <h5 class="card-text">Total: ${{ orderTotal | formatNumber }}</h5>
                <p v-if="!orderNoOfItems">Please select some items.</p>
                </div>
            </div>
        </div>
        <div class="grid md:grid-cols-1 mt-3">
            <form autocomplete="off" @submit.stop.prevent="handleSubmit">
                <div class="grid grid-cols-2 gap-4 address-section">
                    <div>
                        <div class="mb-2 grid sm:grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="s-address">
                                    Shipping First Name
                                </label>
                                <input id="s-address" type="text" placeholder="Enter your first name" v-model="order.shippingInfo.firstName" required autofocus="true" class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            </div>
                            <div>
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="s-address">
                                    Shipping Last Name
                                </label>
                                <input id="s-address" type="text" placeholder="Enter your last name" v-model="order.shippingInfo.lastName" required autofocus="true" class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            </div>
                        </div>
                        <div class="mb-2">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="s-company">
                                Shipping Company
                            </label>
                            <input id="s-company" type="text" placeholder="Enter company name" v-model="order.shippingInfo.company" autofocus="true" class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        </div>
                        <div class="mb-2">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="s-address">
                                Shipping Address
                            </label>
                            <input id="s-address" type="text" placeholder="Enter your address" v-model="order.shippingInfo.address1" required autofocus="true" class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        </div>
                        <div class="mb-2">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="s-city">
                                Shipping City
                            </label>
                            <input id="s-city" type="text" placeholder="Enter your city" v-model="order.shippingInfo.city" required autofocus="true" class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        </div>
                        <div class="mb-2">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="s-state">
                                Shipping State
                            </label>
                            <input id="s-state" type="text" placeholder="Enter your state" v-model="order.shippingInfo.state" required autofocus="true" class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        </div>
                        <div class="mb-5">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="s-zip-code">
                                Shipping Zip Code
                            </label>
                            <input id="s-zip-code" type="text" placeholder="Enter your postal code" v-model="order.shippingInfo.zip" required autofocus="true" class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        </div>
                        <div class="mb-5">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="s-contact-no">
                                Shipping Contact No.
                            </label>
                            <input id="s-contact-no" type="text" placeholder="Enter your contact no." v-model="order.shippingInfo.contactNo" required autofocus="true" class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        </div>
                        <div class="mb-5">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="s-email">
                                Shipping Email
                            </label>
                            <input id="s-email" type="text" placeholder="Enter your email" v-model="order.shippingInfo.email" required autofocus="true" class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        </div>
                    </div>
                    <div>
                        <div class="mb-2 grid sm:grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="s-address">
                                    Billing First Name
                                </label>
                                <input id="s-address" type="text" placeholder="Enter your first name" v-model="order.billingInfo.firstName" required autofocus="true" class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            </div>
                            <div>
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="s-address">
                                    Billing Last Name
                                </label>
                                <input id="s-address" type="text" placeholder="Enter your last name" v-model="order.billingInfo.lastName" required autofocus="true" class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            </div>
                        </div>
                        <div class="mb-2">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="b-company">
                                Billing Company
                            </label>
                            <input id="b-company" type="text" placeholder="Enter company name" v-model="order.billingInfo.company" autofocus="true" class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        </div>
                        <div class="mb-2">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="b-address">
                                Billing Address
                            </label>
                            <input id="b-address" type="text" placeholder="Enter your address" v-model="order.billingInfo.address1" required autofocus="true" class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        </div>
                        <div class="mb-2">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="b-city">
                                Billing City
                            </label>
                            <input id="b-city" type="text" placeholder="Enter your city" v-model="order.billingInfo.city" required autofocus="true" class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        </div>
                        <div class="mb-2">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="b-state">
                                Billing State
                            </label>
                            <input id="b-state" type="text" placeholder="Enter your state" v-model="order.billingInfo.state" required autofocus="true" class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        </div>
                        <div class="mb-2">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="b-zip-code">
                                Billing Zip Code
                            </label>
                            <input id="b-zip-code" type="text" placeholder="Enter your postal code" v-model="order.billingInfo.zip" required autofocus="true" class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        </div>
                        <div class="mb-5">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="b-contact-no">
                                Billing Contact No.
                            </label>
                            <input id="b-contact-no" type="text" placeholder="Enter your contact no." v-model="order.billingInfo.contactNo" required autofocus="true" class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        </div>
                        <div class="mb-5">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="b-email">
                                Billing Email
                            </label>
                            <input id="b-email" type="text" placeholder="Enter your email" v-model="order.billingInfo.email" required autofocus="true" class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-1 gap-4 cc-section px-6 py-6" v-if="paymentType == 1 || paymentType == 3 || paymentType == 5">
                    <h2 class="mt-2">Credit Card Detail</h2>
                    <div class="mb-2">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="s-address">
                            Card Number
                        </label>
                        <input id="cc-number" type="text" placeholder="Enter your card number" v-model="order.ccDetail.ccNo" required autofocus="true" class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    </div>
                    <div class="mb-2">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="s-address">
                                    Expiry Date
                                </label>
                                <select id="cc-expiry-month" v-model="order.ccDetail.ccExpiryMonth" class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                    <option v-for="option in ccMonths" :value="option.value" :key="option.value">
                                        {{ option.text }}
                                    </option>
                                </select>
                                <select id="cc-expiry-year" v-model="order.ccDetail.ccExpiryYear" class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                    <option v-for="option in ccYears" :value="option.value" :key="option.value">
                                        {{ option.text }}
                                    </option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="s-address">
                                    Security Code
                                </label>
                                <input id="cc-cvv" type="text" placeholder="Enter your security code" v-model="order.ccDetail.cvv" required autofocus="true" class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-1 gap-4 cc-section px-6 pt-6 pb-0" v-if="paymentType == 2">
                    <h2 class="mt-2">Credit Card Detail</h2>
                    <div id="card-container"></div>
                    <button id="ach-button" type="button">Pay with Bank Account</button>
                    <button id="googlePay"></button>
                    <div id="gift-card-container"></div>
                    <div id="afterpay"></div>
                </div>
                <div id="google-pay-block"></div>
                <button :disabled="loading" type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-3">
                    Submit
                </button>
            </form>
            </div>
        </div>
        <div class="mt-5" v-if="!orderNoOfItems">
            Cart is empty
        </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import '~/utils/filters'
import { pad, convertObjectToQueryUrl } from '~/utils/functions'
import { v4 as uuidv4 } from 'uuid'

import PayWithNmi from '~/utils/payments/nmi'

export default {
  layout: "club",
  data() {
    return {
        order: {
            billingInfo: {
                'firstName': '',
                'lastName': '',
                'company': '',
                'address1': '',
                'address2': '',
                'city': '',
                'state': '',
                'zip' : '',
                'contactNo': '',
                'email': ''
            },
            shippingInfo: {
                'firstName': '',
                'lastName': '',
                'company': '',
                'address1': '',
                'address2': '',
                'city': '',
                'state': '',
                'zip' : '',
                'contactNo': '',
                'email': ''
            },
            ccDetail: {
                'ccNo': '',
                'ccExpiryMonth': 0,
                'ccExpiryYear': new Date().getFullYear(),
                'cvv': ''
            },
            orderNo: null,
            orderDate: null,
            items: [],
            total: 0.0
        },
        loading: false,
        paymentType: 1,
        purchaseTypes: [],
        selectedPaymentMethod: null,
        ccMonths: [
            {text: 'Jan', value: 1},
            {text: 'Feb', value: 2},
            {text: 'Mar', value: 3},
            {text: 'Apr', value: 4},
            {text: 'May', value: 5},
            {text: 'Jun', value: 6},
            {text: 'Jul', value: 7},
            {text: 'Aug', value: 8},
            {text: 'Sept', value: 9},
            {text: 'Oct', value: 10},
            {text: 'Nov', value: 11},
            {text: 'Dec', value: 12}
        ],
        ccYears: [],
        paymentApiNmi: null
    }
  },
  computed: {
    ...mapGetters({
        orderItems: 'order/orderItems',
        orderBundles: 'order/orderBundles',
        orderTotal: 'order/orderTotal',
        orderNoOfItems: 'order/orderNoOfItems',
        loggedUser: 'auth/user'
    })
  },
  methods: {
    async handleSubmit() {
        this.loading = true;
        try {
            this.order.orderDate = Date.now();
            this.order.orderNo = await this.$strapi.$http.$post('/incremental-values/get-value', { code: 'order-no' });
            this.order.items = this.cart.items;
            this.order.total = this.cart.total;

            let paymentResult = false;
            if (this.paymentType == 1) {
                this.paymentApiNmi = new PayWithNmi(this.order, this.$axios);
                paymentResult = this.paymentApiNmi.pay();
            }
            if (paymentResult) {
                alert('Your order have been successfully submitted.');
                this.placeOrder({
                    orderNo: this.orderNo,
                    orderDate: this.orderDate,
                    billingFirstName: this.order.billingInfo.firstName,
                    billingLastName: this.order.billingInfo.lastName,
                    billingCompany: this.order.billingInfo.company,
                    billingAddress1: this.order.billingInfo.address1,
                    billingCity: this.order.billingInfo.city,
                    billingState: this.order.billingInfo.state,
                    billingZipCode: this.order.billingInfo.zip,
                    billingContactNo: this.order.billingInfo.contactNo,
                    shippingFirstName: this.order.shippingInfo.firstName,
                    shippingLastName: this.order.shippingInfo.lastName,
                    shippingCompany: this.order.shippingInfo.company,
                    shippingAddress1: this.order.shippingInfo.address1,
                    shippingCity: this.order.shippingInfo.city,
                    shippingState: this.order.shippingInfo.state,
                    shippingZipCode: this.order.shippingInfo.zip,
                    shippingContactNo: this.order.shippingInfo.contactNo
                });
                this.$router.push('/');
            } else {
                alert('Your order submittion was not successfull.');
            }
        } catch (error) {
            this.loading = false;
            console.log(error);
        }
    },
    addToCart(item) {
        let selected = {
          productId: item.product.id,
          quantity: 1
        };
        this.$store.dispatch('order/addProduct', selected);
    },
    removeFromCart(item) {
        let selected = {
          productId: item.product.id,
          quantity: 1
        };
        this.$store.dispatch('order/removeProduct', selected);
    },
    emptyCart() {
        this.$store.dispatch('order/clearOrder');
    },
    placeOrder(data) {
        this.$store.dispatch('order/placeOrder', data);
    }
  },
  async mounted () {
    if (this.loggedUser) {
        this.order.shippingInfo.firstName = this.loggedUser.first_name;
        this.order.shippingInfo.lastName = this.loggedUser.last_name;
        this.order.billingInfo.firstName = this.loggedUser.first_name;
        this.order.billingInfo.lastName = this.loggedUser.last_name;
    }

    for (let i = 1940; i < 2099; i++) {
        this.ccYears.push({'text': i, 'value': i});
    }
    this.purchaseTypes = await this.$strapi.find('purchase-types');
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
.address-section {
    border: 1px solid lightgray;
    border-radius: 5px;
    padding: 25px;
    margin: 0;
}
.cc-section {
    border: 1px solid lightgray;
    border-radius: 5px;
    margin: 0;
    margin-top: 15px;

    select#cc-expiry-month {
        width: 100%;
        max-width: 150px;
        background: white;
    }

    select#cc-expiry-year {
        width: 100%;
        max-width: 150px;
        margin-left: 8px;
        background: white;
    }

}
#google-pay-block {
    margin-top: 20px;
}
</style>