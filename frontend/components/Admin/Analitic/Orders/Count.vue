<template>
  <div class="col p-0">
    <div class="d-flex justify-content-between">
      <label for="count" class="d-flex font-weight-bold">Count</label>
      <p class="m-0 p-0">Total: {{ total }}</p>
    </div>
    <client-only>
      <VueApexCharts
        ref="count"
        id="count"
        class="mt-2 w-100"
        height="200"
        :options="chartOptions"
        :series="count"
      />
    </client-only>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Activity",
  data: () => ({
    total: 0,
    chartOptions: {
      chart: {
        id: "vuechart-analitic-orders",
        type: "area",
      },
      xaxis: {
        type: "datetime",
      },
    },
    count: [{ name: "orders", data: [] }],
  }),
  computed: {
    ...mapGetters({
      orders: "admin_orders/orders",
    }),
  },
  watch: {
    orders: function () {
      this.updateOrders();
    },
  },
  methods: {
    updateOrders: async function () {
      const data = this.orders.reduce((acc, item) => {
        const date = new Date(item.created_at).toDateString();

        const index = acc.findIndex((item) => item.x === date);

        if (index !== -1) {
          acc[index].y = acc[index].y + 1;
        } else {
          acc.push({ x: date, y: 1 });
        }
        return acc;
      }, []);

      this.total = this.orders.length;
      this.updateSeriesLine(data);
    },
    updateSeriesLine(data) {
      if (this.$refs.count) {
        this.$refs.count.updateSeries([{ data }], false, true);
      }
    },
  },
  mounted() {
    this.updateOrders();
  },
};
</script>

<style scoped>
</style>