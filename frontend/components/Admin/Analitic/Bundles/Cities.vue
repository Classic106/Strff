<template>
  <div class="col">
    <label for="cities" class="d-flex font-weight-bold">Cities</label>
    <div class="w-100" id="cities"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Cities",
  data: () => ({
    currentVisitors: [],
  }),
  computed: {
    ...mapGetters({
      visitors: "admin_visitors/visitors",
    }),
  },
  methods: {},
  async mounted() {},
};
</script>

<style scoped>
</style>