<template>
  <div class="col">
    <ChoseDates class="mt-2" v-on:setRange="setRange" label="Attendance" />
    <client-only>
      <VueApexCharts
        ref="attendance"
        class="mt-2 w-100"
        height="200"
        :options="chartOptions"
        :series="attendance"
      />
    </client-only>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import ChoseDates from "../ChoseDates.vue";

export default {
  name: "Attendance",
  components: { ChoseDates },
  data: () => ({
    range: [new Date()],
    chartOptions: {
      chart: {
        id: "vuechart-example1",
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
    range: function () {
      this.setVisitorsByTime();
    },
  },
  methods: {
    ...mapActions({
      getVisitors: "admin_visitors/getVisitors",
    }),
    setRange: function (range) {
      this.range = range;
    },
    setVisitorsByTime: async function () {
      const [from, to] = this.range;

      await this.getVisitors({ from, to });

      const data = this.visitors.reduce((acc, item) => {
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
      if (this.$refs.attendance) {
        this.$refs.attendance.updateSeries([{ data }], false, true);
      }
    },
  },
  async mounted() {
    await this.setVisitorsByTime();
  },
};
</script>

<style scoped>
</style>