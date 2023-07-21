<template>
  <div class="col">
    <ChoseDates class="mt-2" v-on:setRange="setRange" label="Chose dates" />
    <Attendance class="mt-2" />
    <Cities class="my-2" />
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";

import ChoseDates from "~/components/Admin/common/ChoseDates.vue";
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
    ...mapMutations({
      clearVisitors: "admin_visitors/clearVisitors",
    }),
    setRange: function (range) {
      this.range = range;
    },
    setVisitorsByTime: async function () {
      const [from, to] = this.range;

      await this.getVisitors({ from, to });
    },
  },
  destroy() {
    this.clearVisitors();
  },
};
</script>

<style scoped>
</style>