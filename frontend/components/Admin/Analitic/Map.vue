<template>
  <client-only>
    <l-map class="map" :zoom="zoom" :center="center" v-on:zoom="setZoom">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker
        v-for="marker in markers"
        :key="marker.id"
        :lat-lng="marker.latlng"
        @l-add="$event.target.openPopup()"
      >
        <l-popup
          :content="content(marker)"
          :options="options"
          v-on:ready="ready"
        ></l-popup>
      </l-marker>
    </l-map>
  </client-only>
</template>

<script>
export default {
  name: "Map",
  props: {
    markers: Array,
  },
  data: () => ({
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution:
      '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    zoom: 15,
    center: [39.82818, -98.5795],
    options: {
      autoClose: false,
      closeOnClick: false,
    },
  }),
  methods: {
    ready: ({ _source }) => _source.openPopup(),
    setZoom: function ({ sourceTarget }) {
      const { _zoom } = sourceTarget;
      this.$emit("setByState", _zoom <= 5);
    },
    content: function ({ content, count }) {
      return `<div class="row justify-content-center m-0 p-0">
                <p class="col-12 font-weight-bold mb-2 m-0 p-0">${content}</p>
                ${count}
              </div>`;
    },
  },
};
</script>

<style scoped>
.map {
  height: 40vh;
}
</style>