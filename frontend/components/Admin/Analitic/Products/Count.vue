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
    series: [{ name: "products", data: [] }],
  }),
  computed: {
    ...mapGetters({
      orders: "admin_orders/orders",
    }),
  },
  watch: {
    orders: function () {
      this.updateProducts();
    },
  },
  methods: {
    updateProducts: async function () {
      const result = this.orders.reduce(
        (acc, item) => {
          const date = new Date(item.created_at).toDateString();
          const counts = {
            product_count: 0,
            bundles_product_count: 0,
          };

          const { series, total } = acc;
          const { order_bundles, order_items } = item;

          if (order_items && order_items.length) {
            counts.product_count = order_items.length;
          }

          if (order_bundles && order_bundles.length) {
            const bundles_product_count = order_bundles.reduce((acc, item) => {
              const { bundle } = item;

              if (bundle && bundle.products) {
                acc += bundle.products.length;
              }

              return acc;
            }, 0);

            counts.bundles_product_count = bundles_product_count;
          }

          const { product_count, bundles_product_count } = counts;
          const summ = product_count + bundles_product_count;
          acc.total = total + summ;

          const index = series.findIndex((item) => item.x === date);

          if (index !== -1) {
            const { product_count, bundles_product_count } = counts;
            const y = product_count + bundles_product_count;

            acc.series[index].y = acc.series[index].y + y;
          } else {
            const { product_count, bundles_product_count } = counts;
            const y = product_count + bundles_product_count;

            acc.series.push({ x: date, y });
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
    this.updateProducts();
  },
};
</script>

<style scoped>
</style>