<template>
  <div class="col">
    <ChoseDates class="mt-2" v-on:setRange="setRange" label="Chose dates" />
    <Attendance class="mt-2" />
    <Cities class="mt-2" />
  </div>
</template>

<script>
import { mapActions } from "vuex";

import ChoseDates from "../ChoseDates.vue";
import Attendance from "./Attendance.vue";
import Cities from "./Cities.vue";

export default {
  name: "Visitors",
  components: { Attendance, Cities, ChoseDates },
  data: () => ({
    range: [],
  }),
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
    },
  },
  async mounted() {
    await this.setVisitorsByTime();
  },
};
</script>

<style scoped>
</style>