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
    series: [{ name: "customers", data: [] }],
  }),
  computed: {
    ...mapGetters({
      customers: "admin_customers/customers",
    }),
  },
  watch: {
    customers: function () {
      this.updateCustomers();
    },
  },
  methods: {
    updateCustomers: async function () {
      const result = this.customers.reduce((acc, item) => {
        const date = new Date(item.created_at).toDateString();

        const index = acc.findIndex((item) => item.x === date);

        if (index !== -1) {
          acc[index].y = acc[index].y + 1;
        } else {
          acc.push({ x: date, y: 1 });
        }

        return acc;
      }, []);

      this.total = this.customers.length;
      this.updateSeriesLine(result);
    },
    updateSeriesLine(data) {
      if (this.$refs.counts) {
        this.$refs.counts.updateSeries([{ data }], false, true);
      }
    },
  },
  mounted() {
    this.updateCustomers();
  },
};
</script>

<style scoped>
</style>