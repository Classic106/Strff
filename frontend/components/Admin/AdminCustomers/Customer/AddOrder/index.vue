<template>
  <div class="row justify-content-center w-100 m-0">
    <div class="col-10 mt-3">
      <div class="d-flex w-100 mb-3 d-flex align-items-center">
        <button v-on:click="$emit('closeCreateOrder')" class="mr-3">
          <BIconArrowLeft />
        </button>
        <h6 class="m-0">Create order</h6>
      </div>
      <div>
        <div class="block p-3 mb-3">
          <h6>Products</h6>
          <ProductsBlock v-on:setProducts="setProducts" />
        </div>
        <div class="block p-3 mb-3">
          <h6>Bundles</h6>
          <BundlesBlock v-on:setBundles="setBundles" />
        </div>
        <div class="d-flex flex-column">
          <div class="block mb-3 d-flex flex-column p-3">
            <h6>Customer</h6>
            <p>{{ selected.email }}</p>
            <p>{{ getCustomerName() }}</p>
            <p>{{ selected.address1 && selected.address2 }}</p>
            <p>{{ selected.state }}</p>
            <p>{{ selected.cellphone }}</p>
          </div>
        </div>
        <div class="block p-3 mb-3">
          <h6>Payment</h6>
          <div class="d-flex justify-content-between">
            <p>Subtotal</p>
            <p>$ {{ order.total | formatNumber }}</p>
          </div>
          <div class="d-flex justify-content-between">
            <p>Total</p>
            <p>$ {{ order.total | formatNumber }}</p>
          </div>
        </div>
      </div>
      <button class="btn btn-success w-100 mb-3" v-on:click="send">
        Create order
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import PreloaderImage from "~/components/common/PreloaderImage.vue";
import ProductsBlock from "./ProductsBlock.vue";
import BundlesBlock from "./BundlesBlock.vue";

export default {
  name: "AddOrder",
  components: { PreloaderImage, ProductsBlock, BundlesBlock },
  data: () => ({
    order: {
      total: 0,
      order_status: "1",
      order_bundles: [],
      order_items: [],
      paid: false,
      customer: null,
    },
  }),
  computed: {
    ...mapGetters({
      selected: "admin_customers/selected",
    }),
  },
  methods: {
    ...mapActions({
      createOrder: "admin_orders/createOrder",
    }),
    setProducts: function (data) {
      this.order.order_items = data;
      this.total = this.calcTotal();
    },
    setBundles: function (data) {
      this.order.order_bundles = data;
      this.total = this.calcTotal();
    },
    getCustomerName: function () {
      const { firstName, lastName } = this.selected;

      return `${firstName} ${lastName}`;
    },
    calcTotal: function () {
      const totalProducts = this.order.order_items.reduce(
        (acc, item) => (acc += item.total),
        0
      );

      const totalBundles = this.order.order_bundles.reduce(
        (acc, item) => (acc += item.bundle.price),
        0
      );

      return totalProducts + totalBundles;
    },
    send: async function () {
      await this.createOrder({ ...this.order, customer: this.selected.id });
    },
  },
};
</script>

<style scoped>
.block {
  border: 1px solid #000;
  border-radius: 10px;
  background-color: #fff;
}
</style>