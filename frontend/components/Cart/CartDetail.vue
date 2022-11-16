<template>
  <div class="cart-detail d-flex flex-column">
    <div v-if="!orderNoOfItems && !orderBundleNoOfItems" class="cart empty p-4 d-flex flex-column justify-content-center align-items-center m-auto">
      <h6 class="text-center">Your Shopping Cart is Empty</h6>
      <h6 class="gold cursor-pointer" v-on:click="$emit('close')">SHOP NOW</h6>
    </div>
    <vueCustomScrollbar v-else class="h-100 px-sm-3 px-1 d-flex flex-lg-row flex-column overflow-auto" :settings="scrollAreaSettings">
      <div class="cart d-flex flex-column px-sm-3 px-1">
        <h6 class="text-uppercase text-center my-3">
          Total Price: {{ totalPrice | formatNumber }} $
        </h6>
        <vueCustomScrollbar class="px-sm-3 px-1 mb-auto" :settings="itemsSettings">
          <CartOrderItems v-if="orderNoOfItems" :order_items="orderItems"/>
          <OrderBundles v-if="orderBundleNoOfItems" :order_bundles="orderBundles"/>
        </vueCustomScrollbar>
        <nuxt-link to="/checkout" v-on:click.native="linkClick" class="text-white text-uppercase text-center p-3 my-3 gold-background d-none d-lg-block">
            Go To Checkout
        </nuxt-link>
      </div>
    </vueCustomScrollbar>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

import CartOrderItems from "./CartOrderItems.vue";
import OrderBundles from "./OrderBundles.vue";
import PurchaseTypes from "~/components/common/PurchaseTypes";
import PreloaderImage from "~/components/PreloaderImage";

export default {
  props: ["isOpen"],
  components: {
    CartOrderItems,
    OrderBundles,
    PurchaseTypes,
    PreloaderImage,
  },
  data: () => ({
    scrollAreaSettings: {
      suppressScrollX: true,
      wheelPropagation: false,
    },
    itemsSettings: {
      suppressScrollX: true,
      wheelPropagation: true,
    },
    purchaseTypes: [],
  }),
  computed: {
    ...mapGetters({
        orderItems: 'order/orderItems',
        orderBundles: 'order/orderBundles',
        orderNoOfItems: 'order/orderNoOfItems',
        orderBundleNoOfItems: 'order/orderBundleNoOfItems',
        totalPrice: 'order/orderTotal'
    }),
  },
  methods: {
    linkClick() {
      this.$emit('close');
    }
  },
  async mounted() {
    this.purchaseTypes = await this.$strapi.find('purchase-types');
  },
};
</script>

<style scoped>
@media (min-width: 992px) {
  .cart.empty {
    width: 600px;
  }
}

.cart-detail {
  background: #333333;
  z-index: 1;
  height: 100%;
}

.cart {
  max-width: 600px;
  z-index: 1;
  position: relative;
  background: #333333;
}

h6,
p {
  text-transform: uppercase;
}

button {
  color: #fff;
  border: none;
}
</style>