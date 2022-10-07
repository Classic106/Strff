<template>
  <div class="menu h-100">
    <ul class="d-flex flex-column h-100 pt-3 p-0 pr-2">
      <li
        v-on:click="setCurrentPage('home')"
        class="menu-item d-flex align-items-center"
        :class="currentPage === 'home' && 'active'"
      >
        <span class="d-flex align-items-center w-100 p-1"
          ><BIconHouseDoorFill class="mr-2" />Home</span
        >
      </li>
      <li
        v-on:click="setCurrentPage('orders')"
        class="menu-item d-flex align-items-center"
        :class="currentPage === 'orders' && 'active'"
      >
        <span class="d-flex align-items-center w-100 p-1"
          ><BIconInboxFill class="mr-2" />Orders</span
        >
      </li>
      <li
        v-on:click="setCurrentPage('products')"
        class="menu-item d-flex align-items-center"
        :class="currentPage === 'products' && 'active'"
      >
        <span class="d-flex align-items-center w-100 p-1"
          ><BIconTagFill class="mr-2" />Products</span
        >
      </li>
      <li
        v-on:click="setCurrentPage('bundles')"
        class="menu-item d-flex align-items-center"
        :class="currentPage === 'bundles' && 'active'"
      >
        <span class="d-flex align-items-center w-100 p-1"
          ><BIconTagsFill class="mr-2" />Bundles</span
        >
      </li>
      <li
        v-on:click="setCurrentPage('customers')"
        class="menu-item d-flex align-items-center"
        :class="currentPage === 'customers' && 'active'"
      >
        <span class="d-flex align-items-center w-100 p-1"
          ><BIconPersonFill class="mr-2" />Customers</span
        >
      </li>
    </ul>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  name: "AdminMenu",
  computed: {
    ...mapGetters({ currentPage: "admin/currentPage" }),
  },
  methods: {
    ...mapMutations({
      clearProducts: "admin/clearProducts",
      setCurrentPage: "admin/setCurrentPage",
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

span {
  font-size: 1rem;
}

.menu {
  z-index: 20;
  color: #000;
  border-right: 1px solid black;
}

.menu-item::before {
  content: "";
  width: 4px;
  height: 100%;
  display: block;
  margin-right: 4px;
}

.menu-item.active::before {
  content: "";
  background-color: green;
  border-radius: 0 5px 5px 0;
}

.menu-item.active > span {
  background-color: #edeef0;
  border-radius: 5px;
  color: green;
}
</style>