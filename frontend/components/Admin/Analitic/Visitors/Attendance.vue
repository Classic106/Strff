<template>
  <div class="col p-0">
    <div class="d-flex justify-content-between">
      <label for="attendance" class="d-flex font-weight-bold">Attendance</label>
      <p class="m-0 p-0">Total: {{ total }}</p>
    </div>
    <client-only>
      <VueApexCharts
        ref="attendance"
        id="attendance"
        class="mt-2 w-100"
        height="200"
        :options="chartOptions"
        :series="attendance"
      />
    </client-only>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Attendance",
  data: () => ({
    total: 0,
    chartOptions: {
      chart: {
        id: "vuechart-analitic-visitors",
        type: "area",
      },
      xaxis: {
        type: "datetime",
      },
    },
    attendance: [{ name: "visitors", data: [] }],
  }),
  computed: {
    ...mapGetters({
      visitors: "admin_visitors/visitors",
    }),
  },
  watch: {
    visitors: function () {
      this.updateVisitors();
    },
  },
  methods: {
    updateVisitors: async function () {
      const data = this.visitors.reduce((acc, item) => {
        const date = new Date(item.created_at).toDateString();

        const index = acc.findIndex((item) => item.x === date);

        if (index !== -1) {
          acc[index].y = acc[index].y + 1;
        } else {
          acc.push({ x: date, y: 1 });
        }
        return acc;
      }, []);

      this.total = this.visitors.length;
      this.updateSeriesLine(data);
    },
    updateSeriesLine(data) {
      if (this.$refs.attendance) {
        this.$refs.attendance.updateSeries([{ data }], false, true);
      }
    },
  },
  mounted() {
    this.updateVisitors();
  },
};
</script>

<style scoped>
</style>