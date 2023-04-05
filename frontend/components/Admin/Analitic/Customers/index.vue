<template>
  <div class="col">
    <ChoseDates class="mt-2" v-on:setRange="setRange" label="Chose dates" />
    <Count class="mt-2" />
    <Cities class="mt-2" />
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";

import ChoseDates from "../ChoseDates.vue";
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
  async mounted() {
    await this.setOrdersByTime();
  },
};
</script>

<style scoped>
</style>