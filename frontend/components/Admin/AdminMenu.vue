<template>
  <div class="menu">
    <ul class="d-flex flex-column mr-md-0 mr-5">
      <li v-on:click="setPage('home')">Home</li>
      <li v-on:click="setPage('orders')">Orders</li>
      <li v-on:click="setPage('products')">Products</li>
      <li v-on:click="setPage('customers')">Customers</li>
    </ul>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "AdminMenu",
  methods: {
    ...mapMutations({
      clearProducts: "admin/clearProducts",
    }),
    setPage: function (page) {
      this.clearProducts();
      this.$emit("setPage", page);
    },
  },
};
</script>

<style scoped>
@media (max-width: 768px) {
  .menu {
    color: #000 !important;
    background-color: #fff;
  }
}

.menu {
  z-index: 20;
  color: #fff;
}
</style>