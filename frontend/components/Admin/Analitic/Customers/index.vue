<template>
  <div class="col">
    <ChoseDates class="mt-2" v-on:setRange="setRange" label="Chose dates" />
    <Count class="mt-2" />
    <Cities class="my-2" />
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";

import ChoseDates from "~/components/Admin/common/ChoseDates.vue";
import Count from "./Count.vue";
import Cities from "./Cities.vue";

export default {
  name: "customers",
  components: { Count, Cities, ChoseDates },
  data: () => ({
    range: [],
  }),
  watch: {
    range: function () {
      this.setOrdersByTime();
    },
  },
  methods: {
    ...mapActions({
      getAnaliticCustomers: "admin_customers/getAnaliticCustomers",
    }),
    ...mapMutations({
      clearCustomers: "admin_customers/clearCustomers",
    }),
    setRange: function (range) {
      this.range = range;
    },
    setOrdersByTime: async function () {
      const [from, to] = this.range;

      await this.getAnaliticCustomers({ from, to });
    },
  },
  destroy() {
    this.clearCustomers();
  },
};
</script>

<style scoped>
</style>