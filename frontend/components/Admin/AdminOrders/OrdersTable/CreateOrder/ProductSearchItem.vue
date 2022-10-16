<template>
  <div class="row w-100 m-0 mb-2">
    <div class="col-2 p-0 d-flex align-items-center">
      <PreloaderImage :image="item.image[0].url" />
    </div>
    <div class="text-ellipsis col-6 d-flex align-items-center p-1">
      {{ item.title }}
    </div>
    <div class="col-4 d-flex align-items-center justify-content-center p-1">
      $ {{ item.price | formatNumber }}
    </div>
  </div>
</template>

<script>
import "~/utils/filters";

import PreloaderImage from "~/components/common/PreloaderImage.vue";

export default {
  name: "ProductItem",
  props: { item: Object },
  components: { PreloaderImage },
};
</script>

<style scoped>
</style>