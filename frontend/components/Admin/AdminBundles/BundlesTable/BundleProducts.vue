<template>
  <div class="row align-items-center">
    <div class="wrap-img col-5">
      <PreloaderImage :image="products[0].image[0].url" class="p-0" />
    </div>
    <span>+</span>
    <div class="wrap-img col-5">
      <PreloaderImage :image="products[1].image[0].url" />
    </div>
  </div>
</template>

<script>
import PreloaderImage from "~/components/common/PreloaderImage.vue";

export default {
  name: "BundleProducts",
  components: { PreloaderImage },
  props: {
    products: Array,
  },
};
</script>

<style scoped>
</style>