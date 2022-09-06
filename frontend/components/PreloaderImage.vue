<template>
  <VueLoadImage>
    <img
      slot="image"
      :src="`${getImage(image)}`"
      :class="classStyle ? classStyle : 'm-auto'"
    />
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
  },
  methods: {
    getStrapiMedia,
    getImage: function (image) {
      if (image) {
        return this.getStrapiMedia(image);
      }
      return null;
    },
  },
};
</script>

<style scoped>
.vue-load-image {
  display: flex;
  height: 100%;
}

img {
  border-radius: 10px;
}
</style>