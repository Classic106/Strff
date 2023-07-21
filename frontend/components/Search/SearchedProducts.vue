<template>
  <div class="row">
    <div
      v-for="product in products"
      :key="product.id"
      class="col-12 col-md-6 mb-4"
    >
      <a v-on:click.prevent="redirect(`/products/${product.id}`)" class="h-100">
        <div class="d-flex flex-column h-100">
          <PreloaderImage classStyle="my-auto" :image="product.image[0].url" />
          <div class="d-flex flex-column">
            <span class="text-ellipsis text-uppercase col-white">{{
              product.title
            }}</span>
            <span class="gold">{{ product.price }} $</span>
            <span class="col-white"
              >in <span class="gold">{{ inCategoties(product) }}</span></span
            >
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import Loader from "@/components/common/Loader.vue";
import PreloaderImage from "~/components/PreloaderImage";

export default {
  name: "SearchedProducts",
  props: {
    products: Array,
  },
  components: { Loader, PreloaderImage },
  methods: {
    inCategoties: function (product) {
      const { categories } = product;
      return categories.reduce((acc, category, index) => {
        if (index === 0) {
          return category.name;
        }
        return acc + ", " + category.name;
      }, "");
    },
  },
};
</script>

<style scoped>
</style>