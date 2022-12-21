<template>
  <div class="row justify-content-center w-100">
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
            <p>{{ selected.customer.email }}</p>
            <p>{{ getCustomerName() }}</p>
            <p>{{ selected.customer.address1 && selected.address2 }}</p>
            <p>{{ selected.customer.state }}</p>
            <p>{{ selected.customer.cellphone }}</p>
          </div>
        </div>
        <div class="block p-3 mb-3">
          <h6>Payment</h6>
          <div class="d-flex justify-content-between">
            <p>Subtotal</p>
            <p>$ {{ total | formatNumber }}</p>
          </div>
          <div class="d-flex justify-content-between">
            <p>Total</p>
            <p>$ {{ total | formatNumber }}</p>
          </div>
        </div>
      </div>
      <button class="btn btn-success w-100" v-on:click="send">
        Create order
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import "~/utils/filters";

import ProductsBlock from "~/components/Admin/common/ProductsBlock.vue";
import BundlesBlock from "~/components/Admin/common/BundlesBlock.vue";

export default {
  name: "AddOrder",
  components: { ProductsBlock, BundlesBlock },
  data: () => ({
    total: 0,
    order_status: "1",
    order_bundles: [],
    order_items: [],
    paid: false,
    customer: null,
  }),
  computed: {
    ...mapGetters({
      selected: "admin_orders/selected",
    }),
  },
  methods: {
    setProducts: function (data) {
      this.order_items = data;
      this.total = this.calcTotal();
    },
    setBundles: function (data) {
      this.order_bundles = data;
      this.total = this.calcTotal();
    },
    getCustomerName: function () {
      const { customer } = this.selected;

      if (customer) {
        const { firstName, lastName } = customer;
        return `${firstName} ${lastName}`;
      }

      return "undefined undefined";
    },
    calcTotal: function () {
      const totalProducts = this.order_items.reduce(
        (acc, item) => (acc += item.total),
        0
      );

      const totalBundles = this.order_bundles.reduce(
        (acc, item) => (acc += item.bundle.price),
        0
      );

      return totalProducts + totalBundles;
    },
    send: function () {
      console.log(this.order_items);
    },
  },
  mouted() {
    this.total = this.calcTotal();
  },
};
</script>

<style scoped>
</style>