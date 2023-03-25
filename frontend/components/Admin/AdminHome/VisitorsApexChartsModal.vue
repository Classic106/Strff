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
      <div class="d-flex justify-content-start w-100">
        <button
          class="btn mx-1"
          :class="active === 'month' ? 'btn-success' : 'btn-primary'"
          v-on:click="byMonth"
        >
          month
        </button>
        <button
          class="btn btn-primary mx-1"
          :class="active === 'half year' ? 'btn-success' : 'btn-primary'"
          v-on:click="byHalfYear"
        >
          half year</button
        ><button
          class="btn btn-primary mx-1"
          :class="active === 'year' ? 'btn-success' : 'btn-primary'"
          v-on:click="byYear"
        >
          year
        </button>
      </div>
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

export default {
  name: "VisitorsApexChartsModal",
  data: () => ({
    show: false,
    active: "month",
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
  watch: {
    show: function () {
      if (this.show) {
        this.byMonth();
      }
    },
  },
  methods: {
    ...mapActions({
      getVisitors: "admin_visitors/getVisitors",
    }),
    byMonth: function () {
      const fromDate = new Date(new Date().setMonth(new Date().getMonth() - 1));

      this.setVisitors(fromDate);
      this.active = "month";
    },
    byHalfYear: function () {
      const fromDate = new Date(new Date().setMonth(new Date().getMonth() - 6));

      this.setVisitors(fromDate);
      this.active = "half year";
    },
    byYear: function () {
      const fromDate = new Date(
        new Date().setFullYear(new Date().getFullYear() - 1)
      );

      this.setVisitors(fromDate);
      this.active = "year";
    },
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