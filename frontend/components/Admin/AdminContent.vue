<template>
  <div class="d-flex justify-content-center">
    <AdminHome v-if="currentPage === 'home'" />
    <AdminOrders v-else-if="currentPage === 'orders'" />
    <AdminProducts v-else-if="currentPage === 'products'" />
    <AdminBundles v-else-if="currentPage === 'bundles'" />
    <AdminCustomers v-else-if="currentPage === 'customers'" />
    <span v-else>{{ currentPage }}</span>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import AdminHome from "./AdminHome/index.vue";
import AdminOrders from "./AdminOrders";
import AdminProducts from "./AdminProducts";
import AdminBundles from "./AdminBundles";
import AdminCustomers from "./AdminCustomers";

export default {
  name: "AdminContent",
  components: {
    AdminHome,
    AdminOrders,
    AdminProducts,
    AdminBundles,
    AdminCustomers,
  },
  computed: {
    ...mapGetters({ currentPage: "admin/currentPage" }),
  },
};
</script>

<style scoped>
</style>