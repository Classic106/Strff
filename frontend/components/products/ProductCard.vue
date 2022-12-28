<template>
  <div class="d-flex flex-column justify-content-between h-100">
    <nuxt-link :to="`/products/${product.id}`" class="h-100 d-flex flex-column">
      <PreloaderImage
        :classStyle="'mb-2 w-100 my-auto'"
        :image="product.image[0].url"
        rounded
      />
      <div class="mb-0 mt-auto">
        <h6
          class="
            text-ellipsis
            col-black
            text-upprcase
            m-2
            mb-4
            text-uppercase text-nowrap
          "
        >
          {{ product.title }}
        </h6>
        <h5 class="price gold d-flex justify-content-center m-3 text-nowrap">
          {{ product.price }} $
        </h5>
      </div>
    </nuxt-link>
    <button
      class="
        py-2
        px-4
        rounded
        btn
        d-flex
        justify-content-center
        align-items-center
        text-uppercase text-nowrap
        w-100
      "
      v-on:click="addToCart"
    >
      <span class="icon icon-bag mr-2 d-none d-lg-flex"></span>
      Add to cart
    </button>
  </div>
</template>

<script>
import PreloaderImage from "~/components/common/PreloaderImage";

export default {
  name: "ProductCard",
  props: {
    product: Object,
  },
  components: { PreloaderImage },
  methods: {
    addToCart() {
      const { product } = this;

      const selected = {
        product,
        quantity: 1,
        purchase_type: 1,
        subscription_type: null,
        total: product.price,
      };
      this.$store.dispatch("order/addProduct", selected);
    },
  },
};
</script>

<style scoped>
button {
  background-color: #1f2020;
  color: #fff;
}

button:hover {
  color: #9e7d24;
}

.content {
  margin-left: 35px;
  margin-right: 35px;
}

.price {
  font-size: 1.5rem;
}

.icon-bag {
  filter: invert(98%) sepia(98%) saturate(0%) hue-rotate(326deg)
    brightness(103%) contrast(102%);
}
</style>
