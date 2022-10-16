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
        <div v-if="!customer">
          <div class="d-flex align-items-center position-relative">
            <BIconSearch class="search-icon d-flex position-absolute" />
            <input
              v-model="customer"
              type="text"
              placeholder="Search customer"
              class="bg-grey py-1 w-100"
            />
          </div>
          <select v-if="customers.length" multiple :size="1" class="w-100">
            <option
              :value="customer.id"
              v-for="customer in customers"
              :key="customer.id"
              class="row"
            >
              <div class="col-6">{{ getCustomerName(customer) }}</div>
              <div class="col-6">{{ customer.email }}</div>
            </option>
          </select>
        </div>
        <div v-else class="row">
          <div class="col-11">
            <p>{{ getCustomerName(customer) }}</p>
            <p>{{ customer.email }}</p>
            <p>{{ customer.address1 && customer.address2 }}</p>
            <p>{{ customer.state.name }}</p>
            <p>{{ customer.zip }}</p>
            <p>{{ customer.cellphone }}</p>
          </div>
          <div class="col-1 d-flex align-items-start justify-content-center">
            <BIconX v-on:click="customer = ''" />
          </div>
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
import AddCustomerModal from "../AddCustomerModal.vue";
import BundlesBlock from "./BundlesBlock.vue";
import ProductsBlock from "./ProductsBlock.vue";

export default {
  name: "CreateOrder",
  components: { PreloaderImage, AddCustomerModal, BundlesBlock, ProductsBlock },
  data: () => ({
    customer: "",
    order_items: [],
    order_bundles: [],
    customers: [],
    order: {},
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
      const data = { ...this.order, ...this.customer };
      console.log(data);
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