<template>
  <div class="col">
    <div class="row m-0 p-0 justify-content-between">
      <label for="cities" class="d-flex font-weight-bold">Cities</label>
      <p class="m-0" v-show="unknown_bundles_count > 0">
        unknown bundles: {{ unknown_bundles_count }}
      </p>
    </div>
    <div class="w-100" id="cities">
      <Map :markers="markers" v-on:setByState="setByState" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import { by_state_or_city } from "../functions";

import Map from "../Map.vue";

export default {
  name: "Cities",
  components: { Map },
  data: () => ({
    unknown_bundles_count: 0,
    markers: [],
    by_state: false,
  }),
  computed: {
    ...mapGetters({
      orders: "admin_orders/orders",
    }),
  },
  watch: {
    orders: function () {
      this.initMarkers();
    },
    by_state: function () {
      this.initMarkers();
    },
  },
  methods: {
    setByState: function (by_state) {
      this.by_state = by_state;
    },
    initMarkers: function () {
      const { by_state } = this;
      let tmp = {};

      const result = [...this.orders].reduce(
        (acc, order) => {
          const { user } = order;

          if (!user) {
            acc[0]++;
            return acc;
          }

          const [new_acc, new_tmp] = by_state_or_city(by_state, acc, user, tmp);
          tmp = new_tmp;
          return new_acc;
        },
        [0, []]
      );

      const [unknown_bundles_count, markers] = result;

      this.unknown_bundles_count = unknown_bundles_count;
      this.markers = markers;
    },
  },
  async mounted() {
    this.initMarkers();
  },
};
</script>

<style scoped>
</style>