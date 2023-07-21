<template>
  <BModal
    v-model="show"
    id="orders-apex-charts"
    title="Orders"
    size="lg"
    centered
    hide-footer
  >
    <div class="d-flex flex-column justify-content-center align-items-center">
      <DatesButtons
        :byMonth="setOrdersByTime"
        :byHalfYear="setOrdersByTime"
        :byYear="setOrdersByTime"
        init
      />
      <VueApexCharts
        ref="realtimeChart"
        class="w-100"
        height="400"
        :options="chartOptions"
        :series="series"
      />
    </div>
  </BModal>
</template>

<script>
import { mapActions } from "vuex";

import DatesButtons from "~/components/common/DatesButtons";

export default {
  name: "OrdersApexChartsModal",
  components: { DatesButtons },
  data: () => ({
    show: false,
    chartOptions: {
      chart: {
        id: "vuechart-example",
        type: "area",
      },
      xaxis: {
        type: "datetime",
      },
    },
    series: [{ name: "orders", data: [] }],
  }),
  methods: {
    ...mapActions({
      getOrdersByTime: "admin_orders/getOrdersByTime",
    }),
    setOrdersByTime: async function (fromDate) {
      const result = await this.getOrdersByTime(fromDate);

      const data = result.reduce((acc, item) => {
        const date = new Date(item.created_at).toDateString();

        if (!acc.length) {
          acc.push({ x: date, y: 1 });
          return acc;
        }

        const index = acc.findIndex((item) => item.x === date);

        if (index !== -1) {
          acc[index].y = acc[index].y + 1;
        } else {
          acc.push({ x: date, y: 1 });
        }
        return acc;
      }, []);

      this.updateSeriesLine(data);
    },
    updateSeriesLine(data) {
      if (this.$refs.realtimeChart) {
        this.$refs.realtimeChart.updateSeries([{ data }], false, true);
      }
    },
  },
};
</script>

<style scoped>
</style>