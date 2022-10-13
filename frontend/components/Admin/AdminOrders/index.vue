<template>
  <div class="w-100">
    <div
      v-if="loading"
      class="w-100 h-100 d-flex align-items-center justify-content-center"
    >
      <Loader />
    </div>
    <div v-else class="w-100 h-100">
      <OrdersTable v-if="!selected" />
      <AdminOrder v-else />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

import Loader from "~/components/common/Loader";
import OrdersTable from "./OrdersTable";
import AdminOrder from "./AdminOrder";

export default {
  name: "AdminOrders",
  components: { Loader, OrdersTable, AdminOrder },
  data: () => ({
    loading: true,
  }),
  computed: {
    ...mapGetters({ selected: "admin_orders/selected" }),
  },
  methods: {
    ...mapActions({ getOrders: "admin_orders/getOrders" }),
    ...mapMutations({
      clearOrders: "admin_orders/clearOrders",
      setCurrentPage: "admin/setCurrentPage",
    }),
  },
  beforeMount() {
    const page = this.$route.path.replace("/admin/", "");
    this.setCurrentPage(page);
  },
  async mounted() {
    this.loading = true;
    await this.getOrders();
    this.loading = false;
  },
  destroyed() {
    this.clearOrders();
  },
};
</script>

<style scoped>
</style>