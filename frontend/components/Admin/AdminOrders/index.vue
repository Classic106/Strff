<template>
  <div class="w-100">
    <div
      v-if="loading"
      class="w-100 h-100 d-flex align-items-center justify-content-center"
    >
      <Loader />
    </div>
    <div v-else>
      <OrdersTable v-if="!selected" />
      <div v-else>selected {{ selected.id }}</div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import Loader from "~/components/common/Loader";
import OrdersTable from "./OrdersTable";

export default {
  name: "AdminOrders",
  components: { Loader, OrdersTable },
  data: () => ({ loading: false }),
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