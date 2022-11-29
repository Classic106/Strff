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
  methods: {
    ...mapActions({
      getVisitors: "admin_visitors/getVisitors",
    }),
    byMonth: function () {
      const toDate = new Date();
      const fromDate = new Date(new Date().setMonth(toDate.getMonth() - 1));

      this.setVisitors({ fromDate, toDate });
      this.active = "month";
    },
    byHalfYear: function () {
      const toDate = new Date();
      const fromDate = new Date(new Date().setMonth(toDate.getMonth() - 6));

      this.setVisitors({ fromDate, toDate });
      this.active = "half year";
    },
    byYear: function () {
      const toDate = new Date();
      const fromDate = new Date(
        new Date().setFullYear(toDate.getFullYear() - 1)
      );

      this.setVisitors({ fromDate, toDate });
      this.active = "year";
    },
    setVisitors: async function ({ fromDate, toDate }) {
      await this.getVisitors({ fromDate, toDate });

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

      this.series[0].data = data;
    },
  },
  async mounted() {
    this.byMonth();
  },
};
</script>

<style scoped>
</style>