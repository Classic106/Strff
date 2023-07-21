<template>
  <Order v-if="!isCutomer" v-on:setCustomer="isCutomer = true" />
  <Customer v-else :id="customer" :back="back" />
</template>

<script>
import { mapGetters } from "vuex";

import Order from "./Order.vue";
import Customer from "~/components/Admin/common/Customer";

export default {
  name: "AdminOrder",
  components: { Order, Customer },
  data: () => ({
    isCutomer: false,
    customer: null,
  }),
  computed: {
    ...mapGetters({
      selected: "admin_orders/selected",
    }),
  },
  methods: {
    back: function () {
      this.isCutomer = false;
    },
  },
  beforeMount() {
    const { user } = this.selected;
    if (user) {
      this.customer = user.id;
    }
  },
};
</script>

<style scoped>
</style>