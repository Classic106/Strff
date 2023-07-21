<template>
  <BModal
    v-model="show"
    id="visitors-apex-charts"
    title="Visitors"
    size="lg"
    centered
    hide-footer
  >
    <div class="d-flex flex-column justify-content-center align-items-center">
      <DatesButtons
        :byMonth="setVisitors"
        :byHalfYear="setVisitors"
        :byYear="setVisitors"
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
import { mapGetters, mapActions } from "vuex";

import DatesButtons from "~/components/common/DatesButtons";

export default {
  name: "VisitorsApexChartsModal",
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
    series: [{ name: "visitors", data: [] }],
  }),
  computed: {
    ...mapGetters({
      visitors: "admin_visitors/visitors",
    }),
  },
  methods: {
    ...mapActions({
      getVisitors: "admin_visitors/getVisitors",
    }),
    setVisitors: async function (from) {
      await this.getVisitors({ from });

      const data = this.visitors.reduce((acc, item) => {
        const date = new Date(item.created_at).toLocaleDateString("en-US");

        if (!acc.length) {
          acc.push({ x: date, y: item.visits });
          return acc;
        }

        const index = acc.findIndex((item) => item.x === date);

        if (index !== -1) {
          acc[index].y = acc[index].y + item.visits;
        } else {
          acc.push({ x: date, y: item.visits });
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