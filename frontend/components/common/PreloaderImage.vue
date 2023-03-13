<template>
  <div class="d-flex justify-content-center align-items-center">
    <img
      src="@/assets/img/Curve-Loading.gif"
      v-if="pending"
      alt="image"
      :class="setClassStyle()"
    />
    <img v-else-if="!alt" :src="img" alt="image" :class="setClassStyle()" />
    <p v-else class="text-ellipsis m-0" v-b-tooltip.hover :title="alt">
      {{ alt }}
    </p>
  </div>
</template>

<script>
import { getStrapiMedia } from "~/utils/medias";

export default {
  name: "PreloaderImage",
  props: {
    image: String,
    alt: String,
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
    getImage: function () {
      const { image } = this;

      this.pending = true;

      if (image) {
        try {
          fetch(this.getStrapiMedia(image)).then(
            (data) => (this.img = data.url)
          );
        } catch (e) {
          this.img = require("@/assets/img/image-not-found.jpg");
        }
      } else {
        this.img = require("@/assets/img/image-not-found.jpg");
      }

      this.pending = false;
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
    this.getImage();
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