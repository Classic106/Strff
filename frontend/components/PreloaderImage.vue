<template>
  <VueLoadImage>
    <img slot="image" :src="`${getImage(image)}`" :class="setClassStyle()" />
    <img slot="preloader" class="m-auto" src="@/assets/img/Curve-Loading.gif" />
    <img slot="error" class="m-auto" src="@/assets/img/image-not-found.jpg" />
  </VueLoadImage>
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
  methods: {
    getStrapiMedia,
    getImage: function (image) {
      if (image) {
        return this.getStrapiMedia(image);
      }
      return null;
    },
    setClassStyle: function () {
      const rounded = this.rounded ? "border-round" : "";

      if (this.classStyle) {
        return `${this.classStyle} ${rounded}`;
      }
      return `m-auto ${rounded}`;
    },
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