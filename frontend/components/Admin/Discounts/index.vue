<template>
  <DiscountTable v-if="isTable" v-on:setIsTable="isTable = false" />
  <Discount v-else v-on:setIsTable="isTable = true" />
</template>

<script>
import { mapActions, mapMutations } from "vuex";

import DiscountTable from "./DiscountTable.vue";
import Discount from "./Discount.vue";

export default {
  name: "Discounts",
  components: { Discount, DiscountTable },
  data: () => ({
    isTable: true,
  }),
  methods: {
    ...mapActions({
      getDiscounts: "admin_discounts/getDiscounts",
    }),
    ...mapMutations({
      clearDiscounts: "admin_discounts/clearDiscounts",
    }),
  },
  async mounted() {
    await this.getDiscounts();
  },
  destroyed() {
    this.clearDiscounts();
  },
};
</script>

<style scoped>
</style>