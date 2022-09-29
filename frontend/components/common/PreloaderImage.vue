<template>
  <img
    src="@/assets/img/Curve-Loading.gif"
    v-if="pending"
    alt="image"
    :class="setClassStyle()"
  />
  <img v-else :src="img" alt="image" :class="setClassStyle()" />
</template>

<script>
import { getStrapiMedia } from "~/utils/medias";

export default {
  name: "PreloaderImage",
  props: {
    image: {
      required: true,
      type: String,
    },
    classStyle: String,
    rounded: Boolean,
  },
  data() {
    return {
      pending: true,
      img: "",
    };
  },
  watch: {
    image: function () {
      this.getImage(this.image);
    },
  },
  methods: {
    getStrapiMedia,
    getImage: function (image) {
      this.pending = true;
      fetch(this.getStrapiMedia(image))
        .then((data) => (this.img = data.url))
        .finally(() => (this.pending = false));
    },
    setClassStyle: function () {
      const rounded = this.rounded ? "border-round" : "";

      if (this.classStyle) {
        return `${this.classStyle} ${rounded}`;
      }
      return `m-auto ${rounded}`;
    },
  },
  mounted() {
    this.getImage(this.image);
  },
};
</script>

<style scoped>
.vue-load-image {
  display: flex;
  height: 100%;
}

.border-round {
  border-radius: 10px;
}
</style>