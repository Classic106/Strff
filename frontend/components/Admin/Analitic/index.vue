<template>
  <div class="col p-2">
    <div class="row m-0">
      <button class="btn btn-primary mr-1" v-on:click="page = 'visitors'">
        Visitors
      </button>
      <button class="btn btn-primary mr-1" v-on:click="page = 'orders'">
        Orders
      </button>
      <button class="btn btn-primary mr-1" v-on:click="page = 'products'">
        Products
      </button>
      <button class="btn btn-primary mr-1" v-on:click="page = 'customers'">
        Customers
      </button>
    </div>
    <Visitors v-if="page === 'visitors'" />
  </div>
</template>

<script>
import Visitors from "./Visitors";

export default {
  name: "Analitic",
  components: { Visitors },
  data: () => ({
    page: "visitors",
  }),
};
</script>

<style scoped>
</style>