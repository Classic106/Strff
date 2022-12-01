<template>
  <div class="row justify-content-center w-100 m-0">
    <div class="col-10 mt-3">
      <div class="d-flex w-100 mb-3 d-flex align-items-center">
        <button v-on:click="$emit('setIsTable')" class="mr-3">
          <BIconArrowLeft />
        </button>
        <h6 class="m-0">Create order</h6>
      </div>
      <form
        autocomplete="off"
        id="add-customer-form"
        v-on:submit.prevent="submit"
        class="mb-3"
      >
        <div class="row">
          <div class="col-6">
            <div class="block p-3 mb-3">
              <label class="d-flex" for="products"> Products </label>
              <ProductsBlock v-on:setProducts="setProducts" id="products" />
            </div>
          </div>
          <div class="col-6">
            <div class="block p-3 mb-3">
              <label class="d-flex" for="bundles"> Bundles </label>
              <BundlesBlock v-on:setBundles="setBundles" id="bundles" />
            </div>
          </div>
        </div>
        <div class="block p-3 mb-3">
          <div class="d-flex justify-content-between align-items-center">
            <label class="d-flex" for="customer"> Customer </label>
            <a
              href="#"
              id="customer"
              v-if="!order.customer"
              v-on:click.prevent="
                !order.customer &&
                  $root.$emit('bv::show::modal', 'create-order-modal')
              "
              >Add customer</a
            >
          </div>
          <CustomersBlock v-on:setCustomer="setCustomer" />
        </div>
        <div class="block p-3 mb-3">
          <label class="d-flex" for="payment"> Payment </label>
          <div id="payment">
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
        <button class="btn btn-success w-100" type="submit">
          Create order
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

import "~/utils/filters";

import BundlesBlock from "~/components/Admin/common/BundlesBlock.vue";
import ProductsBlock from "~/components/Admin/common/ProductsBlock.vue";
import CustomersBlock from "./CustomersBlock.vue";

export default {
  name: "CreateOrder",
  components: {
    BundlesBlock,
    ProductsBlock,
    CustomersBlock,
  },
  data: () => ({
    order: {
      order_items: [],
      order_bundles: [],
      customer: null,
      total: 0,
    },
  }),
  methods: {
    ...mapActions({ createOrder: "admin_orders/createOrder" }),
    setProducts: function (data) {
      this.order.order_items = data;
      this.order.total = this.calcTotal();
    },
    setBundles: function (data) {
      this.order.order_bundles = data;
      this.order.total = this.calcTotal();
    },
    setCustomer: function (customer) {
      this.order.customer = customer;
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
    getCustomerName: function (customer) {
      const { firstName, lastName } = orer.customer;
      return `${firstName} ${lastName}`;
    },
    addCustomer: function (customer) {
      this.order.customer = customer;
    },
    submit: async function () {
      const { order_items, order_bundles, customer, total } = this.order;

      if (!customer) {
        return;
      }

      const { id } = customer;

      const order = {
        order_items,
        order_bundles,
        customer: id,
        total,
        paid: false,
        order_status: 1,
        order_date: new Date(),
      };

      await this.createOrder(order);

      this.order = {
        order_items: [],
        order_bundles: [],
        customer: null,
        total: 0,
      };
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

.search-icon {
  z-index: 1;
  left: 6px;
}
</style>