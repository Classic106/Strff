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
  name: "OrdersApexChartsModal",
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
    series: [{ name: "orders", data: [] }],
  }),
  methods: {
    ...mapActions({
      getOrdersByTime: "admin_orders/getOrdersByTime",
    }),
    byMonth: function () {
      const fromDate = new Date(new Date().setMonth(new Date().getMonth() - 1));

      this.setOrdersByTime(fromDate);
      this.active = "month";
    },
    byHalfYear: function () {
      const fromDate = new Date(new Date().setMonth(new Date().getMonth() - 6));

      this.setOrdersByTime(fromDate);
      this.active = "half year";
    },
    byYear: function () {
      const fromDate = new Date(
        new Date().setFullYear(new Date().getFullYear() - 1)
      );

      this.setOrdersByTime(fromDate);
      this.active = "year";
    },
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