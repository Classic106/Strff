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
        width="500"
        :options="chartOptions"
        :series="series"
      ></VueApexCharts>
    </div>
  </BModal>
</template>

<script>
import { mapGetters } from "vuex";

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
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 35, 50, 49, 60, 70, 91],
      },
    ],
  }),
  computed: {
    ...mapGetters({}),
  },
  mounted() {
    console.log(this.$refs);
  },
};
</script>

<style scoped>
</style>