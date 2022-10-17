<template>
  <div class="row justify-content-center w-100 m-0">
    <div class="col-10 mt-3">
      <div class="d-flex w-100 mb-3 d-flex align-items-center">
        <button v-on:click="$emit('setIsTable')" class="mr-3">
          <BIconArrowLeft />
        </button>
        <h6 class="m-0">Create order</h6>
      </div>
      <div class="row">
        <div class="col-6">
          <div class="block p-3 mb-3">
            <h6>Products</h6>
            <ProductsBlock v-on:setProducts="setProducts" />
          </div>
        </div>
        <div class="col-6">
          <div class="block p-3 mb-3">
            <h6>Bundles</h6>
            <BundlesBlock v-on:setBundles="setBundles" />
          </div>
        </div>
      </div>
      <div class="block p-3 mb-3">
        <div class="d-flex justify-content-between align-items-center">
          <h6>Customer</h6>
          <a
            href="#"
            v-if="!customer"
            v-on:click.prevent="
              !customer && $root.$emit('bv::show::modal', 'create-order-modal')
            "
            >Add customer</a
          >
        </div>
        <CustomersBlock v-on:setCustomer="setCustomer" />
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
      <button class="btn btn-success w-100" v-on:click="submit">
        Create order
      </button>
      <AddCustomerModal v-on:addCustomer="addCustomer" />
    </div>
  </div>
</template>

<script>
import "~/utils/filters";

import PreloaderImage from "~/components/common/PreloaderImage.vue";
import AddCustomerModal from "./AddCustomerModal.vue";
import BundlesBlock from "./BundlesBlock.vue";
import ProductsBlock from "./ProductsBlock.vue";
import CustomersBlock from "./CustomersBlock.vue";

export default {
  name: "CreateOrder",
  components: {
    PreloaderImage,
    AddCustomerModal,
    BundlesBlock,
    ProductsBlock,
    CustomersBlock,
  },
  data: () => ({
    order_items: [],
    order_bundles: [],
    customer: null,
    total: 0,
  }),
  methods: {
    setProducts: function (data) {
      this.order_items = data;
      this.total = this.calcTotal();
    },
    setBundles: function (data) {
      this.order_bundles = data;
      this.total = this.calcTotal();
    },
    setCustomer: function (customer) {
      this.customer = customer;
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
    getCustomerName: function (customer) {
      const { firstName, lastName } = customer;
      return `${firstName} ${lastName}`;
    },
    addCustomer: function (customer) {
      this.customer = customer;
    },
    submit: function () {
      const { order_items, order_bundles, customer, total } = this;
      const order = {
        order_items,
        order_bundles,
        customer,
        total,
        paid: false,
        order_status: 1,
      };
      console.log(order);
    },
  },
};
</script>

<style scoped>
input {
  position: relative;
  border: 1px solid #000;
  border-radius: 5px;
  padding-left: 30px;
}

.block {
  border: 1px solid #000;
  border-radius: 10px;
  background-color: #fff;
}

.search-icon {
  z-index: 1;
  left: 6px;
}
</style>