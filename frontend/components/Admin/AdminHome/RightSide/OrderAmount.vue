<template>
  <ul class="p-0 m-0">
    <li
      v-for="order_amount in order_amounts"
      :key="order_amount.date"
      class="
        d-flex
        flex-md-row flex-column
        justify-content-between
        align-items-center
      "
    >
      <span class="text-nowrap">{{ order_amount.date }}</span>
      <span class="text-nowrap">$ {{ order_amount.total | formatNumber }}</span>
    </li>
    <a href="/#" v-on:click.prevent="openModal('order-amount-apex-charts')"
      >View report</a
    >
    <OrderAmoutApexChartsModal />
  </ul>
</template>

<script>
import { mapActions } from "vuex";

import "~/utils/filters";
import OrderAmoutApexChartsModal from "./OrderAmoutApexChartsModal.vue";

export default {
  name: "OrderAmount",
  components: { OrderAmoutApexChartsModal },
  data: () => ({
    order_amounts: [],
  }),
  methods: {
    ...mapActions({
      getOrdersByTime: "admin_orders/getOrdersByTime",
    }),
    openModal: function (modal) {
      this.$root.$emit("bv::show::modal", modal);
    },
  },
  async mounted() {
    //fromDate = minus 3 days from current date
    const fromDate = new Date(new Date().setDate(new Date().getDate() - 3));
    const result = await this.getOrdersByTime(fromDate);

    this.order_amounts = result.reduce((acc, item) => {
      const date = new Date(item.created_at).toDateString();

      if (!acc.length) {
        acc.push({ date, total: item.total });
        return acc;
      }

      const index = acc.findIndex((item) => item.date === date);

      if (index !== -1) {
        acc[index].total = acc[index].total + item.total;
      } else {
        acc.push({ date, total: item.total });
      }
      return acc;
    }, []);
  },
};
</script>

<style scoped>
</style>