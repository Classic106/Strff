<template>
  <div class="col">
    <div class="row m-0 p-0 justify-content-between">
      <label for="cities" class="d-flex font-weight-bold">Cities</label>
      <p class="m-0">unknown visitors: {{ unknown_visitors_count }}</p>
    </div>
    <div class="w-100" id="cities">
      <Map :markers="markers" v-on:setByState="setByState" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Map from "../Map.vue";

export default {
  name: "Cities",
  components: { Map },
  data: () => ({
    unknown_visitors_count: 0,
    markers: [],
    by_state: false,
  }),
  computed: {
    ...mapGetters({
      visitors: "admin_visitors/visitors",
    }),
  },
  watch: {
    visitors: function () {
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
      const result = [...this.visitors].reduce(
        (acc, item) => this.by_state_or_city(acc, item),
        [0, []]
      );

      const [unknown_visitors_count, markers] = result;

      this.unknown_visitors_count = unknown_visitors_count;
      this.markers = markers;
    },
    by_state_or_city: function (
      acc,
      { id, city, state, latitude, longitude, visits }
    ) {
      const { by_state } = this;

      const content = by_state ? state : city;

      if (!content) {
        acc[0] += visits;
      } else {
        let index = -1;

        if (by_state) {
          index = acc.findIndex((item) => item.state === content);
        } else {
          index = acc.findIndex((item) => item.city === content);
        }

        if (index !== -1) {
          acc[1][index].count += visits;
        } else {
          const latlng = [latitude, longitude];
          acc[1].push({ id, content, latlng, count: visits });
        }
      }
      return acc;
    },
  },
  async mounted() {
    this.initMarkers();
  },
};
</script>

<style scoped>
</style>