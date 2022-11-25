<template>
    <section class="container checkout">
      <div class="row">
        <div class="col-12 col-md-4">
            <div class="block">
                <h2>Contact Information</h2>
                <input type="text" placeholder="Email" v-model="orderInputs.shippingInfo.email"/>
            </div>
            <div class="block">
                <h2>Shipping Address</h2>
                <div class="row">
                    <div class="col-12 col-md-6">
                        <input type="text" placeholder="First name" v-model="orderInputs.shippingInfo.firstName"/>
                    </div>
                    <div class="col-12 col-md-6">
                        <input type="text" placeholder="Last name" v-model="orderInputs.shippingInfo.lastName"/>
                    </div>
                    <div class="col-12 col-md-6">
                        <input type="text" placeholder="Company (optional)" v-model="orderInputs.shippingInfo.company"/>
                    </div>
                    <div class="col-12 col-md-6">
                        <input type="text" placeholder="Address 1" v-model="orderInputs.shippingInfo.address1"/>
                    </div>
                    <div class="col-12 col-md-6">
                        <input type="text" placeholder="Address 2" v-model="orderInputs.shippingInfo.address2"/>
                    </div>
                    <div class="col-12 col-md-6">
                        <input type="text" placeholder="City" v-model="orderInputs.shippingInfo.city"/>
                    </div>
                    <div class="col-12 col-md-6">
                        <select placeholder="State" v-model="orderInputs.shippingInfo.state">
                            <option value="">State</option>
                            <option v-for="option in states" v-bind:value="option.abbreviation" v-bind:key="option.abbreviation">
                                {{ option.name }}
                            </option>
                        </select>
                    </div>
                    <div class="col-12 col-md-6">
                        <input type="text" placeholder="Zip" v-model="orderInputs.shippingInfo.zip"/>
                    </div>
                </div>
            </div>
            <div class="block">
                <h2>Billing Address</h2>
                <div class="row">
                    <div class="col-12 mb-2">
                        <div class="d-flex justify-content-start align-items-center">
                            <input type="checkbox" v-model="isSameAsShipping" v-on:change="sameAsShipping()"/> Same as shipping
                        </div>
                    </div>
                </div>
                <div v-if="!isSameAsShipping" class="row">
                    <div class="col-12 col-md-6">
                        <input type="text" placeholder="First name" v-model="orderInputs.billingInfo.firstName"/>
                    </div>
                    <div class="col-12 col-md-6">
                        <input type="text" placeholder="Last name" v-model="orderInputs.billingInfo.lastName"/>
                    </div>
                    <div class="col-12 col-md-6">
                        <input type="text" placeholder="Company (optional)" v-model="orderInputs.billingInfo.company"/>
                    </div>
                    <div class="col-12 col-md-6">
                        <input type="text" placeholder="Address 1" v-model="orderInputs.billingInfo.address1"/>
                    </div>
                    <div class="col-12 col-md-6">
                        <input type="text" placeholder="Address 2" v-model="orderInputs.billingInfo.address2"/>
                    </div>
                    <div class="col-12 col-md-6">
                        <input type="text" placeholder="City" v-model="orderInputs.billingInfo.city"/>
                    </div>
                    <div class="col-12 col-md-6">
                        <select placeholder="State" v-model="orderInputs.billingInfo.state">
                            <option value="">State</option>
                            <option v-for="option in states" v-bind:value="option.abbreviation" v-bind:key="option.abbreviation">
                                {{ option.name }}
                            </option>
                        </select>
                    </div>
                    <div class="col-12 col-md-6">
                        <input type="text" placeholder="Zip" v-model="orderInputs.billingInfo.zip"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 col-md-4">
            <div class="block">
                <h2>Payment Method</h2>
            </div>
            <div class="block">
                <h2>Shipping Method</h2>
            </div>
        </div>
        <div class="col-12 col-md-4">
            <div class="order-summary">
                <h2>Order Summary</h2>
                <div class="items-list">
                    <ul>
                        <li v-for="item in orderItems" :key="item.id" class="p-3 mb-3">
                            <div class="d-flex justify-content-between">
                                <PreloaderImage
                                    :classStyle="'m-auto gold-border'"
                                    :image="item.product.image[0].url"
                                />
                                <p class="pl-3">
                                    {{ item.product.title }}
                                </p>
                                <p class="pl-3">
                                    {{ item.total | formatNumber }}
                                </p>
                                <div>
                                    <span class="icon icon-trash ml-2" v-on:click="removeItemFromCart(item)"></span>
                                </div>
                            </div>
                        </li>
                        <li v-for="orderBundle in orderBundles" :key="orderBundle.id" class="p-3 mb-3">
                            <div class="d-flex flex-column">
                                <div class="row">
                                    <div class="col-8">
                                        <div v-for="(product, index) in orderBundle.bundle.products" :key="product.id + index">
                                            <div v-if="(index - 1) % 2" class="row w-100 p-0 m-0">
                                                <div v-if="orderBundle.bundle.products[index + 1]" class="row w-100 p-0 m-0">
                                                    <div class="col-5 p-0 d-flex flex-column">
                                                        <div class="mx-auto my-0">
                                                            <PreloaderImage :classStyle="'m-auto gold-border'" :image="orderBundle.bundle.products[index].image[0].url"/>
                                                        </div>
                                                        <div class="d-flex flex-column justify-content-between mt-3">
                                                            <p class="bundle-desc">
                                                                {{ orderBundle.bundle.products[index].title }}
                                                            </p>
                                                            <span class="bundle-price">
                                                                ${{ orderBundle.bundle.products[index].price | formatNumber }}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div class="col-2 p-0 mx-auto mt-3">
                                                        <p class="text-center plus grey">+</p>
                                                    </div>
                                                    <div class="col-5 p-0 d-flex flex-column">
                                                        <div class="mx-auto my-0">
                                                            <PreloaderImage :classStyle="'m-auto gold-border'" :image=" orderBundle.bundle.products[index + 1].image[0].url"/>
                                                        </div>
                                                        <div class="d-flex flex-column justify-content-between mt-3">
                                                            <p class="bundle-desc">
                                                                {{ orderBundle.bundle.products[index + 1].title }}
                                                            </p>
                                                            <span class="bundle-price">
                                                                ${{ orderBundle.bundle.products[index + 1].price | formatNumber }}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div v-else class="d-flex justify-content-center">
                                                    <div class="col-5 p-0 d-flex flex-column">
                                                        <div class="mx-auto my-0">
                                                            <PreloaderImage :classStyle="'m-auto gold-border'" :image="orderBundle.bundle.products[index].image[0].url"/>
                                                        </div>
                                                        <div class="d-flex flex-column justify-content-between mt-3">
                                                            <p class="bundle-desc">
                                                                {{ orderBundle.bundle.products[index].title }}
                                                            </p>
                                                            <span class="bundle-price">
                                                                ${{ orderBundle.bundle.products[index].price | formatNumber }}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-4 d-flex justify-content-end">
                                        <p class="text-right">
                                            ${{ orderBundle.bundle.price }}
                                        </p>
                                        <div>
                                            <span class="icon icon-trash ml-2" v-on:click="removeBundle(orderBundle)"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <input type="submit" value="Place Order" v-on:click="submitOrder()" class="gold-background text-white border p-3 text-uppercase"/>
            </div>
        </div>
      </div>
    </section>
  </template>

  <script>
  import { mapGetters } from 'vuex';
  import '~/utils/filters';
  import { pad, convertObjectToQueryUrl } from '~/utils/functions';
  import { v4 as uuidv4 } from 'uuid';
  import PayWithAuthorizeNet from '~/utils/payments/authorize-net';
  import { states } from "@/data";

  export default {
    layout: "club",
    data() {
      return {
          orderInputs: {
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
              }
          },
          loading: false,
          isSameAsShipping: true,
          paymentType: 1,
          purchaseTypes: [],
          states,
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
          paymentApiAuthorizeNet: null
      }
    },
    computed: {
      ...mapGetters({
          cart: 'order/order',
          orderItems: 'order/orderItems',
          orderBundles: 'order/orderBundles',
          orderTotal: 'order/orderTotal',
          orderNoOfItems: 'order/orderNoOfItems',
          loggedUser: 'auth/user'
      })
    },
    methods: {
      sameAsShipping() {
        if (this.isSameAsShipping) {
            this.orderInputs.billingInfo.firstName = this.orderInputs.shippingInfo.firstName;
            this.orderInputs.billingInfo.lastName = this.orderInputs.shippingInfo.lastName;
            this.orderInputs.billingInfo.company = this.orderInputs.shippingInfo.company;
            this.orderInputs.billingInfo.address1 = this.orderInputs.shippingInfo.address1;
            this.orderInputs.billingInfo.address2 = this.orderInputs.shippingInfo.address2;
            this.orderInputs.billingInfo.city = this.orderInputs.shippingInfo.city;
            this.orderInputs.billingInfo.state = this.orderInputs.shippingInfo.state;
            this.orderInputs.billingInfo.zip = this.orderInputs.shippingInfo.zip;
            this.orderInputs.billingInfo.contactNo = this.orderInputs.shippingInfo.contactNo;
            this.orderInputs.billingInfo.email = this.orderInputs.shippingInfo.email;
        } else {
            this.orderInputs.billingInfo.firstName = '';
            this.orderInputs.billingInfo.lastName = '';
            this.orderInputs.billingInfo.company = '';
            this.orderInputs.billingInfo.address1 = '';
            this.orderInputs.billingInfo.address2 = '';
            this.orderInputs.billingInfo.city = '';
            this.orderInputs.billingInfo.state = '';
            this.orderInputs.billingInfo.zip = '';
            this.orderInputs.billingInfo.contactNo = '';
            this.orderInputs.billingInfo.email = '';
        }
      },
      async submitOrder() {
          this.loading = true;

          try {
              let orderNo = await this.$strapi.$http.$post('/references/generate', { code: 'order-no' });
              let orderDate = Date.now();

              this.cart.order_no = orderNo;
              this.cart.order_date = orderDate;

              let paymentResult = false;
              if (this.paymentType == 1) {
                  this.paymentApiAuthorizeNet = new PayWithAuthorizeNet(this.cart, this.$axios);
                  paymentResult = this.paymentApiAuthorizeNet.pay();
              }

              console.log(paymentResult);

              if (paymentResult) {
                  alert('Your order have been successfully submitted.');
                  this.placeOrder(this.cart);
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
          this.orderInputs.shippingInfo.firstName = this.loggedUser.first_name;
          this.orderInputs.shippingInfo.lastName = this.loggedUser.last_name;
          this.orderInputs.shippingInfo.email = this.loggedUser.email;
          this.orderInputs.billingInfo.firstName = this.loggedUser.first_name;
          this.orderInputs.billingInfo.lastName = this.loggedUser.last_name;
      }

      for (let i = 1940; i < 2099; i++) {
          this.ccYears.push({'text': i, 'value': i});
      }
      this.purchaseTypes = await this.$strapi.find('purchase-types');
    }
  }
  </script>
  <style lang="scss">

  .container {
    max-width: 1600px;
  }

  .checkout {
    margin-top: 50px;
    margin-bottom: 50px;

    input[type="text"], select, textarea {
        padding: 4px 10px;
        width: 100%;
        font-size: 15px;
        margin-bottom: 10px;
    }

    select {
        padding: 6px 10px;
    }

    input[type="checkbox"] {
        width: auto;
        margin-right: 15px;
    }
  }

  .block {
    margin-bottom: 25px;

    h2 {
        font-size: 17px;
        margin-top: 0;
        margin-bottom: 15px;
        font-weight: bold;
    }
  }

  .order-summary {
    h2 {
        font-size: 17px;
        font-weight: bold;
        margin-bottom: 15px;
    }

    .items-list {
        ul {
            margin-left: 0;
            padding-left: 0;
        }

        img {
            max-width: 92px;
        }

        .bundle-desc {
            font-size: 14px;
            line-height: 17px;
            letter-spacing: 0;
            margin-bottom: 0;
            padding-bottom: 0;
        }

        .bundle-price {
            font-size: 14px;
            font-weight: bold;
            line-height: 17px;
            letter-spacing: 0;
            margin-top: 15px;
        }
    }

    .icon {
        display: inline-block;
        width: 18px;
        height: 20px;
        background-size: cover;
    }

    .icon-trash {
        background-image: url("../assets/icons/trash-can-solid.svg");
        filter: invert(39%) sepia(20%) saturate(3094%) hue-rotate(318deg) brightness(94%) contrast(92%);
    }
  }

  </style>