<template>
    <section v-if="!isCheckoutDone" class="container checkout">
      <div class="row">
        <div class="col-12 col-md-4">
            <div class="block">
                <h2>Contact Information</h2>
                <input type="text" placeholder="Email" v-model="order.shipping_email"/>
            </div>
            <div class="block">
                <h2>Shipping Address</h2>
                <div class="row">
                    <div class="col-12 col-md-6">
                        <input type="text" placeholder="First name" v-model="order.shipping_first_name"/>
                    </div>
                    <div class="col-12 col-md-6">
                        <input type="text" placeholder="Last name" v-model="order.shipping_last_name"/>
                    </div>
                    <div class="col-12 col-md-6">
                        <input type="text" placeholder="Company (optional)" v-model="order.shipping_company"/>
                    </div>
                    <div class="col-12 col-md-6">
                        <input type="text" placeholder="Address 1" v-model="order.shipping_address_1"/>
                    </div>
                    <div class="col-12 col-md-6">
                        <input type="text" placeholder="Address 2" v-model="order.shipping_address_2"/>
                    </div>
                    <div class="col-12 col-md-6">
                        <input type="text" placeholder="City" v-model="order.shipping_city"/>
                    </div>
                    <div class="col-12 col-md-6">
                        <select placeholder="State" v-model="order.shipping_state">
                            <option value="">State</option>
                            <option v-for="option in states" v-bind:value="option.abbreviation" v-bind:key="option.abbreviation">
                                {{ option.name }}
                            </option>
                        </select>
                    </div>
                    <div class="col-12 col-md-6">
                        <input type="text" placeholder="Zip" v-model="order.shipping_zip_code"/>
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
                        <input type="text" placeholder="First name" v-model="order.billing_first_name"/>
                    </div>
                    <div class="col-12 col-md-6">
                        <input type="text" placeholder="Last name" v-model="order.billing_last_name"/>
                    </div>
                    <div class="col-12 col-md-6">
                        <input type="text" placeholder="Company (optional)" v-model="order.billing_company"/>
                    </div>
                    <div class="col-12 col-md-6">
                        <input type="text" placeholder="Address 1" v-model="order.billing_address_1"/>
                    </div>
                    <div class="col-12 col-md-6">
                        <input type="text" placeholder="Address 2" v-model="order.billing_address_2"/>
                    </div>
                    <div class="col-12 col-md-6">
                        <input type="text" placeholder="City" v-model="order.billing_city"/>
                    </div>
                    <div class="col-12 col-md-6">
                        <select placeholder="State" v-model="order.billing_state">
                            <option value="">State</option>
                            <option v-for="option in states" v-bind:value="option.abbreviation" v-bind:key="option.abbreviation">
                                {{ option.name }}
                            </option>
                        </select>
                    </div>
                    <div class="col-12 col-md-6">
                        <input type="text" placeholder="Zip" v-model="order.billing_zip_code"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 col-md-4">
            <div class="block">
                <h2>Payment Method</h2>
                <ul class="payment-options">
                    <li v-for="m in paymentMethods" :key="m.id" v-on:click="selectedPaymentMethodId = m.id; selectedPaymentMethodCode = m.code">
                        {{ m.name }}
                        <div v-if="m.code == 'creditcard' && selectedPaymentMethodCode == 'creditcard'" class="creditcard-payment">
                            <Creditcard v-on:setCreditcard="setCreditcard"/>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="block">
                <h2>Shipping Method</h2>
                <ul class="shipping-options">
                    <li v-for="m in shippingMethods" :key="m.id" v-on:click="selectedShippingMethodId = m.id; selectedShippingMethodCode = m.code">
                        {{ m.name }}
                    </li>
                </ul>
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
    <section v-else class="thankyou">
        <div class="container">
            <h1>Thank you, your order has been placed</h1>
            <p>
                Please check your email for order confirmation and detailed delivery Information.
            </p>
        </div>
    </section>
  </template>

  <script>
  import { mapGetters } from 'vuex';
  import '~/utils/filters';
  import { pad, convertObjectToQueryUrl } from '~/utils/functions';
  import { v4 as uuidv4 } from 'uuid';
  import PayWithAuthorizeNet from '~/utils/payments/authorize-net';
  // import ShipWithUsps from '~/utils/shippings/usps';
  import { states } from "@/assets/states";
  import Creditcard from '~/components/Creditcard';

  export default {
    layout: "club",
    data() {
      return {
          isCheckoutDone: false,
          order: {},
          loading: false,
          isSameAsShipping: true,
          purchaseTypes: [],
          states,
          card: {},
          paymentApiAuthorizeNet: null,
          shippingApiUsps: null,
          paymentMethods: [],
          shippingMethods: [],
          selectedPaymentMethodId: null,
          selectedPaymentMethodCode: null,
          selectedShippingMethodId: null,
          selectedShippingMethodCode: null
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
            this.order.billing_first_name = this.order.shipping_first_name;
            this.order.billing_last_name = this.order.shipping_last_name;
            this.order.billing_company = this.order.shipping_company;
            this.order.billing_address_1 = this.order.shipping_address_1;
            this.order.billing_address_2 = this.order.shipping_address_2;
            this.order.billing_city = this.order.shipping_city;
            this.order.billing_state = this.order.shipping_state;
            this.order.billing_zip_code = this.order.shipping_zip_code;
            this.order.billing_contact_no = this.order.shipping_contact_no;
            this.order.billing_email = this.order.shipping_email;
        } else {
            this.order.billing_first_name = '';
            this.order.billing_last_name = '';
            this.order.billing_company = '';
            this.order.billing_address_1 = '';
            this.order.billing_address_2 = '';
            this.order.billing_city = '';
            this.order.billing_state = '';
            this.order.billing_zip_code = '';
            this.order.billing_contact_no = '';
            this.order.billing_email = '';
        }
      },
      async submitOrder() {
          this.loading = true;

          try {
              let orderNo = await this.$strapi.$http.$post('/references/generate', { code: 'order-no' });
              let orderDate = Date.now();
              this.order.order_no = orderNo;
              this.order.order_date = orderDate;
              this.order.payment_method = this.selectedPaymentMethodId;
              this.order.shipping_method = this.selectedShippingMethodId;

              let paymentResult = true;
              if (this.selectedPaymentMethodCode == 'creditcard') {
                  /* this.paymentApiAuthorizeNet = new PayWithAuthorizeNet(this.order, this.$axios);
                  paymentResult = this.paymentApiAuthorizeNet.pay();
                  console.log(paymentResult); */
              }
              let shippingResult = true;
              if (this.selectedShippingMethodCode == 'usps') {
                  /* this.shippingApiUsps = new ShipWithUsps();
                  shippingResult = this.shippingApiUsps.ship();
                  console.log(shippingResult); */
              }
              if (paymentResult && shippingResult) {
                  this.placeOrder(this.order);
                  this.isCheckoutDone = true;
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
      },
      setCreditcard: function (card) {
        this.card = card;
      },
    },
    async mounted () {
      if (!this.orderNoOfItems) {
        this.$router.push('/');
      }
      this.order = Object.assign({}, this.cart);

      if (this.loggedUser) {
          this.order.shipping_first_name = this.loggedUser.first_name;
          this.order.shipping_last_name = this.loggedUser.last_name;
          this.order.shipping_email = this.loggedUser.email;
      } else {
          this.$router.push('/login');
      }
      this.purchaseTypes = await this.$strapi.find('purchase-types');
      this.paymentMethods = await this.$strapi.find('payment-methods');
      this.shippingMethods = await this.$strapi.find('shipping-methods');
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

    ul.payment-options {
        li {
            padding: 15px 15px;
            border: 1px solid gray;
            cursor: pointer;
            margin-top: 10px;
            border-radius: 10px;
        }
    }

    .creditcard-payment {
        padding: 15px 15px 0 15px;
        border: 1px solid gray;
        margin-top: 5px;
    }

    ul.shipping-options {
        li {
            padding: 15px 15px;
            border: 1px solid gray;
            cursor: pointer;
            margin-top: 10px;
            border-radius: 10px;
        }
    }
  }

  .thankyou {

    .container {
        position: relative;
        display: block;
        width: 100%;
        max-width: 800px;
        margin: 15% auto;
    }

    h1 {
        font-size: 32px;
        line-height: 36px;
        margin-bottom: 25px;
    }

    p {
        font-size: 20px;
        line-height: 25px;
        max-width: 500px;
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