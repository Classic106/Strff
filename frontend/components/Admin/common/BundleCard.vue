<template>
  <div class="row m-0 align-item-center">
    <div class="col-2 p-0 d-flex align-items-center">
      <div v-if="bundle.products[0]" class="wrap-img">
        <PreloaderImage :image="bundle.products[0].image[0].url" class="p-0" />
      </div>
      <span v-if="bundle.products[0] && bundle.products[1]">+</span>
      <div v-if="bundle.products[1]" class="wrap-img">
        <PreloaderImage :image="bundle.products[1].image[0].url" />
      </div>
    </div>
    <div class="col-10 row m-0">
      <div class="col-9 d-flex align-items-center">
        <p class="text-ellipsis m-0">{{ bundle.title }}</p>
      </div>
      <div class="col-3 d-flex justify-content-end align-items-center">
        <p class="m-0 text-nowrap pr-3">$ {{ bundle.price | formatNumber }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import "~/utils/filters";
import PreloaderImage from "~/components/common/PreloaderImage.vue";

export default {
  name: "BandleCard",
  props: { bundle: Object },
  components: { PreloaderImage },
};
</script>

<style scoped>
</style>