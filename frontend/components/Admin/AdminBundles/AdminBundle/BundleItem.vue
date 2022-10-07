<template>
  <div class="row w-100 m-0 mb-2">
    <div class="col-2">
      <PreloaderImage :image="item.image[0].url" />
    </div>
    <div class="text-ellipsis col-7 d-flex align-items-center">
      {{ item.title }}
    </div>
    <div class="col-3 d-flex align-items-center justify-content-center">
      $ {{ item.price }}
    </div>
  </div>
</template>

<script>
import PreloaderImage from "~/components/common/PreloaderImage.vue";

export default {
  name: "BundleItem",
  props: { item: Object },
  components: { PreloaderImage },
};
</script>

<style scoped>
</style>