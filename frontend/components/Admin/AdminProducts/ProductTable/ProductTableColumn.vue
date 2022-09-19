<template>
  <div class="item d-flex align-items-center">
    <PreloaderImage :image="item.image[0].url" :classStyle="'image'" rounded />
    <span class="text-ellipsis ml-2">{{ item.title }}</span>
  </div>
</template>

<script>
import PreloaderImage from "~/components/PreloaderImage";

export default {
  name: "ProductTableColumn",
  props: {
    item: Object,
  },
  components: { PreloaderImage },
};
</script>

<style scoped>
.item {
  max-width: 350px;
}

.image {
  height: 50px;
  width: auto;
}
</style>