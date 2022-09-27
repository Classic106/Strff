<template>
  <vueCustomScrollbar
    class="h-100 px-sm-3 px-1 overflow-auto"
    :settings="scrollSettings"
  >
    <div class="w-100">
      <div
        v-if="loading"
        class="w-100 h-100 d-flex align-items-center justify-content-center"
      >
        <Loader />
      </div>
      <div v-else>
        <OrdersTable v-if="!selected" />
        <AdminOrder v-else />
      </div>
    </div>
  </vueCustomScrollbar>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import Loader from "~/components/common/Loader";
import OrdersTable from "./OrdersTable";
import AdminOrder from "./AdminOrder.vue";

export default {
  name: "AdminOrders",
  components: { Loader, OrdersTable, AdminOrder },
  data: () => ({
    loading: false,
    scrollSettings: {
      suppressScrollX: true,
      wheelPropagation: true,
    },
  }),
  computed: {
    ...mapGetters({ selected: "admin_orders/selected" }),
  },
  methods: {
    ...mapActions({ getOrders: "admin_orders/getOrders" }),
  },
  async mounted() {
    this.loading = true;
    await this.getOrders();
    this.loading = false;
  },
};
</script>

<style scoped>
</style>