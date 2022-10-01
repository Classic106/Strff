<template>
  <div class="first-step d-flex flex-column">
    <div v-if="!orderNoOfItems && !orderBundleNoOfItems" class="cart empty p-4 d-flex flex-column justify-content-center align-items-center m-auto">
      <h6 class="text-center">Your Shopping Cart is Empty</h6>
      <h6 class="gold cursor-pointer" v-on:click="$emit('close')">SHOP NOW</h6>
    </div>
    <vueCustomScrollbar
      v-else
      class="h-100 px-sm-3 px-1 d-flex flex-lg-row flex-column overflow-auto"
      :settings="scrollAreaSettings"
    >
      <ShippingInf :isShipping="isShipping" v-on:nextStep="$emit('nextStep')" />
      <div class="cart d-flex flex-column px-sm-3 px-1">
        <h6 class="text-uppercase text-center my-3">
          total price: {{ totalPrice | formatNumber }} $
        </h6>
        <vueCustomScrollbar
          class="px-sm-3 px-1 mb-auto"
          :settings="itemsSettings"
        >
          <CartOrderItems
            v-if="orderNoOfItems"
            :order_items="orderItems"
          />
          <OrderBundles
            v-if="orderBundleNoOfItems"
            :order_bundles="orderBundles"
          />
        </vueCustomScrollbar>
        <button
          class="text-uppercase p-3 my-3 gold-background d-none d-lg-block"
          v-on:click="isShipping = !isShipping"
        >
          {{ isShipping ? "close checkout" : "go to checkout" }}
        </button>
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
import ShippingInf from "./ShippingInf";

export default {
  props: ["isOpen"],
  components: {
    CartOrderItems,
    OrderBundles,
    PurchaseTypes,
    PreloaderImage,
    ShippingInf,
  },
  data: () => ({
    isShipping: false,
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
    calcTotalPrice: function () {
      return 0
    },
  },
  async mounted() {
    this.calcTotalPrice();
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

.first-step {
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