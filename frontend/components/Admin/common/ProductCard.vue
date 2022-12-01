<template>
  <div class="row">
    <div class="wrap-img col-3 position-relative">
      <span
        v-if="quantity"
        class="
          position-absolute
          d-flex
          justify-content-center
          align-items-center
          p-2
        "
        >{{ quantity }}</span
      >
      <PreloaderImage :image="product.image[0].url" />
    </div>
    <div class="col-7 d-flex align-items-center">
      <p class="text-ellipsis m-0">{{ product.title }}</p>
    </div>
    <div class="col-2 d-flex justify-content-end align-items-center">
      <p class="m-0 text-nowrap pr-2">$ {{ product.price | formatNumber }}</p>
    </div>
  </div>
</template>

<script>
import "~/utils/filters";
import PreloaderImage from "~/components/common/PreloaderImage.vue";

export default {
  name: "ProductCard",
  props: {
    product: Object,
    quantity: Number,
  },
  components: { PreloaderImage },
};
</script>

<style scoped>
.wrap-img > span {
  top: -0.8rem;
  right: -0.5rem;
  width: 2rem;
  height: 2rem;
  background-color: #e4e5e7;
  border-radius: 50%;
}
</style>