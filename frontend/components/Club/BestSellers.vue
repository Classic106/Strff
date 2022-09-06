<template>
  <div>
    <div v-if="!products.length">
      <h6>There isn`t any products</h6>
    </div>
    <div v-else class="d-flex flex-column">
      <h6 class="text-center p-4 col-black">BEST SELLERS</h6>
      <div
        class="
          d-flex
          flex-column flex-md-row
          justify-content-center
          align-items-center
        "
      >
        <div class="products row justify-content-center m-0 w-100">
          <div
            v-for="product in products"
            :key="product.id"
            class="product col-11 col-md-4 col-lg-3 p-3 m-2"
          >
            <nuxt-link :to="`/products/${product.id}`" class="h-100">
              <div class="d-flex flex-column h-100 justify-content-between">
                <img class="my-auto" :src="`${getFirstImage(product.image)}`" />
                <div
                  class="
                    card-info
                    col-black
                    d-flex
                    justify-content-between
                    mt-3
                  "
                >
                  <span class="text-nowrap">{{ product.price }} $</span>
                  <span class="text-ellipsis text-upprcase gold ml-2">{{
                    product.title
                  }}</span>
                </div>
              </div>
            </nuxt-link>
          </div>
        </div>
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
@media (min-width: 768px) {
  .product.col-md-4 {
    flex: 0 0 31%;
    max-width: 31%;
  }
}

@media (min-width: 992px) {
  .product.col-lg-3 {
    flex: 0 0 23%;
    max-width: 23%;
  }
}

.product {
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.17);
  border-radius: 10px;
}

.product:hover {
  transform: scale(1.01);
}

img {
  /*box-shadow: 1px 2px 11px 3px rgba(0, 0, 0, 0.06);*/
  border-radius: 10px;
}
</style>