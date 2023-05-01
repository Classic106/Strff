<template>
  <div class="col p-2">
    <div class="row m-0">
      <button
        class="btn mr-1"
        :class="page === 'visitors' ? 'btn-success' : 'btn-primary'"
        v-on:click="page = 'visitors'"
      >
        Visitors
      </button>
      <button
        class="btn mr-1"
        :class="page === 'orders' ? 'btn-success' : 'btn-primary'"
        v-on:click="page = 'orders'"
      >
        Orders
      </button>
      <button
        class="btn mr-1"
        :class="page === 'products' ? 'btn-success' : 'btn-primary'"
        v-on:click="page = 'products'"
      >
        Products
      </button>
      <button
        class="btn mr-1"
        :class="page === 'bundles' ? 'btn-success' : 'btn-primary'"
        v-on:click="page = 'bundles'"
      >
        Bundles
      </button>
      <button
        class="btn mr-1"
        :class="page === 'customers' ? 'btn-success' : 'btn-primary'"
        v-on:click="page = 'customers'"
      >
        Customers
      </button>
    </div>
    <Visitors v-if="page === 'visitors'" />
    <Orders v-if="page === 'orders'" />
    <Products v-if="page === 'products'" />
    <Bundles v-if="page === 'bundles'" />
    <Customers v-if="page === 'customers'" />
  </div>
</template>

<script>
import Visitors from "./Visitors";
import Orders from "./Orders";
import Products from "./Products";
import Bundles from "./Bundles";
import Customers from "./Customers";

export default {
  name: "Analitic",
  components: { Visitors, Orders, Products, Bundles, Customers },
  data: () => ({
    page: "visitors",
  }),
};
</script>

<style scoped>
</style>