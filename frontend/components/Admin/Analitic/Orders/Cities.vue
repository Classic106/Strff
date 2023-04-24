<template>
  <div class="col">
    <label for="cities" class="d-flex font-weight-bold">Cities</label>
    <div class="w-100" id="cities"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import ChoseDates from "../ChoseDates.vue";

export default {
  name: "Cities",
  components: { ChoseDates },
  data: () => ({
    currentOrders: [],
  }),
  computed: {
    ...mapGetters({
      orders: "admin_orders/orders",
    }),
  },
  methods: {},
  async mounted() {},
};
</script>

<style scoped>
</style>