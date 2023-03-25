<template>
  <div class="col">
    <ChoseDates class="m-2" v-on:setRange="setRange" label="Cities" />
    <div class="w-100"></div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import ChoseDates from "../ChoseDates.vue";

export default {
  name: "Cities",
  components: { ChoseDates },
  data: () => ({
    range: [new Date()],
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
    },
  },
  async mounted() {},
};
</script>

<style scoped>
</style>