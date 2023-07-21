<template>
  <div class="col p-0">
    <div class="d-flex justify-content-between">
      <label for="counts" class="d-flex font-weight-bold">Count</label>
      <p class="m-0 p-0">Total: {{ total }}</p>
    </div>
    <client-only>
      <VueApexCharts
        ref="counts"
        id="counts"
        class="mt-2 w-100"
        height="200"
        :options="chartOptions"
        :series="series"
      />
    </client-only>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Count",
  data: () => ({
    total: 0,
    chartOptions: {
      chart: {
        id: "vuechart-analitic-products",
        type: "area",
      },
      xaxis: {
        type: "datetime",
      },
    },
    series: [{ name: "bundles", data: [] }],
  }),
  computed: {
    ...mapGetters({
      orders: "admin_orders/orders",
    }),
  },
  watch: {
    orders: function () {
      this.updateBundles();
    },
  },
  methods: {
    updateBundles: async function () {
      const result = this.orders.reduce(
        (acc, item) => {
          const date = new Date(item.created_at).toDateString();

          const { order_bundles } = item;
          const { series, total } = acc;

          if (order_bundles) {
            const { length } = order_bundles;
            acc.total = total + length;

            const index = series.findIndex((item) => item.x === date);

            if (index !== -1) {
              acc.series[index].y = acc.series[index].y + length;
            } else {
              acc.series.push({ x: date, y: length });
            }
          }

          return acc;
        },
        { series: [], total: 0 }
      );

      const { series, total } = result;

      this.total = total;
      this.updateSeriesLine(series);
    },
    updateSeriesLine(data) {
      if (this.$refs.counts) {
        this.$refs.counts.updateSeries([{ data }], false, true);
      }
    },
  },
  mounted() {
    this.updateBundles();
  },
};
</script>

<style scoped>
</style>