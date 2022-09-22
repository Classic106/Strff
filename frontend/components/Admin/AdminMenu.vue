<template>
  <div class="menu h-100">
    <ul class="d-flex flex-column h-100 mr-md-0 mr-5 mt-3">
      <li v-on:click="setPage('home')" class="d-flex align-items-center">
        <BIconHouseDoor class="mr-2" />Home
      </li>
      <li v-on:click="setPage('orders')" class="d-flex align-items-center">
        <BIconInboxFill class="mr-2" />Orders
      </li>
      <li v-on:click="setPage('products')" class="d-flex align-items-center">
        <BIconTagFill class="mr-2" />Products
      </li>
      <li v-on:click="setPage('customers')" class="d-flex align-items-center">
        <BIconPersonFill class="mr-2" />Customers
      </li>
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