<template>
  <div class="row m-0 w-100 justify-content-between">
    <div
      class="col-11 row m-0 p-0 w-100 justify-content-between align-items-center"
    >
      <div class="col-2 p-0">
        <PreloaderImage :image="product.image[0].url" />
      </div>
      <div class="col-10 p-0 row">
        <div class="text-ellipsis m-0 col-9 d-flex align-items-center">
          {{ product.title }}
        </div>
        <div
          class="text-ellipsis col-3 d-flex align-items-center"
        >
          $ {{ product.price | formatNumber }}
        </div>
      </div>
    </div>
    <div
      class="col-1 d-flex justify-content-end align-items-start p-0"
      v-on:click="deleteProduct"
    >
      <BIconX />
    </div>
  </div>
</template>

<script>
import "~/utils/filters";

import PreloaderImage from "~/components/common/PreloaderImage.vue";

export default {
  name: "ProductItem",
  components: { PreloaderImage },
  props: {
    product: Object,
  },
  methods: {
    deleteProduct: function () {
      const { id } = this.product;

      this.$emit("deleteProduct", id);
    },
  },
};
</script>

<style scoped>
</style>