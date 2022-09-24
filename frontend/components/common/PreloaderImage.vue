<template>
  <img
    v-lazy
    :class="setClassStyle()"
    src="@/assets/img/Curve-Loading.gif"
    :data-src="`${getImage(image)}`"
  />
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
  watch:{
    image: function (){
      console.log(this.image);
    }
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
  directives: {
    lazy: {
      inserted: (el) => {
        const observer = new IntersectionObserver((entries, observer) => {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              let lazyImage = entry.target;
              lazyImage.src = lazyImage.dataset.src;
              observer.unobserve(el);
            }
          });
        });
        observer.observe(el);
      },
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