<template>
  <div class="menu h-100">
    <ul class="d-flex flex-column h-100 mr-md-0 mr-5">
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
    background-color: #fff;
  }
}

.menu {
  z-index: 20;
  color: #000;
  border-right: 1px solid black;
}
</style>