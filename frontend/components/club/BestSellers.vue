<template>
  <div class="d-flex flex-column">
    <h6 class="text-center p-4 col-black">BEST SELLERS</h6>
    <div
      class="
        d-flex
        flex-column flex-md-row
        justify-content-center
        align-items-center
      "
    >
      <div
        v-for="product in products"
        :key="product.id"
        class="product col-11 col-md-4 col-lg-3 p-3 m-2"
      >
        <nuxt-link :to="`/products/${product.id}`">
          <img class="mb-2" :src="`${getFirstImage(product.image)}`" />
          <div class="card-info col-black d-flex justify-content-between">
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
import { shuffleArray } from "~/helpers";

export default {
  data: () => ({
    products: [],
    error: null,
  }),
  async mounted() {
    try {
      const result = await this.$strapi.$bestsellers.find();
      this.products = this.shuffleArray(result[0].products);
      this.products.length = 4;
    } catch (error) {
      this.error = error;
    }
  },
  methods: {
    shuffleArray,
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

<style scoped>
.product {
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.17);
  border-radius: 10px;
}

.product:hover {
  transform: scale(1.01);
}

.product.col-lg-3 {
  flex: 1 0 23%;
}

img {
  box-shadow: 1px 2px 11px 3px rgba(0, 0, 0, 0.06);
  border-radius: 10px;
}
</style>