<template>
  <BModal
    v-model="show"
    id="visitors-apex-charts"
    title="Visitors"
    size="lg"
    centered
    hide-footer
  >
    <div class="d-flex justify-content-center">
      <VueApexCharts
        class="w-100"
        height="400"
        :options="chartOptions"
        :series="series"
      ></VueApexCharts>
    </div>
  </BModal>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "VisitorsApexChartsModal",
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
    series: [],
  }),
  computed: {
    ...mapGetters({ visitors: "admin_visitors/visitors" }),
  },
  methods: {
    ...mapActions({ getVisitors: "admin_visitors/getVisitors" }),
  },
  async mounted() {
    await this.getVisitors();
    const data = this.visitors.reduce((acc, item) => {
      const date = new Date(item.created_at).toDateString();

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

    this.series.push({ name: "visitors", data });
  },
};
</script>

<style scoped>
</style>