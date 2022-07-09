<template>
  <div class="d-flex flex-column">
    <h6 class="p-3 pb-5 text-center col-black">BEST SELLERS</h6>
    <div class="row flex-column flex-md-row justify-content-center">
      <div
        v-for="product in products"
        :key="product.id"
        class="col col-md-5 col-lg-3"
      >
        <nuxt-link :to="`/products/${product.slug}`">
          <img class="mb-2" :src="`${getFirstImage(product.image)}`" />
          <div class="card-info col-black d-flex justify-content-between mb-4">
            <span>{{ product.price }} $</span>
            <span class="text-upprcase gold">{{ product.title }}</span>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { getStrapiMedia } from "~/utils/medias";

export default {
  data: () => ({
    products: [],
    error: null,
  }),
  async mounted() {
    try {
      const result = await this.$strapi.$bestsellers.find();
      this.products = result[0].products;
    } catch (error) {
      this.error = error;
    }
  },
  methods: {
    getStrapiMedia,
    getFirstImage: function (images) {
      if (images[0]) {
        return this.getStrapiMedia(images[0].url);
      }
      return this.getStrapiMedia("/uploads/image_not_found_8c8e4b17cc.jpg");
    },
  },
};
</script>

<style>
</style>