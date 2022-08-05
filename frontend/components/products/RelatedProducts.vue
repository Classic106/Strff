<template>
  <div
    v-if="relatedProducts.length"
    class="d-flex flex-column mt-5 d-none d-md-flex"
  >
    <h6
      class="
        text-uppercase
        related-products
        text-nowrap text-lg-left text-center
      "
    >
      related products
    </h6>
    <div class="row justify-content-center">
      <div
        v-for="product in relatedProducts"
        :key="product.id"
        class="product col-10 col-lg-6 p-4 m-2"
      >
        <nuxt-link :to="`/products/${product.id}`">
          <img :src="`${getFirstImage(product.image)}`" class="m-auto" />
          <div class="d-flex justify-content-between mt-3">
            <span class="font-weight-light text-center col-black text-nowrap">
              ${{ product.price | formatNumber }}
            </span>
            <span class="font-weight-light text-center gold text-nowrap">
              {{ product.title }}
            </span>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { getStrapiMedia } from "~/utils/medias";

export default {
  name: "RelatedProducts",
  props: {
    product: Object,
  },
  data: () => ({
    relatedProducts: [],
  }),
  methods: {
    getStrapiMedia,
    getFirstImage: function (images) {
      if (images[0]) {
        return this.getStrapiMedia(images[0].url);
      }
      return this.getStrapiMedia("/uploads/image_not_found_8c8e4b17cc.jpg");
    },
  },
  async mounted() {
    const products = await this.$strapi.find("products");

    this.relatedProducts = products;
    if (this.product.categories.length && products.length) {
      this.relatedProducts = products.filter((item) => {
        const itemCategoryIds = item.categories.reduce((acc, next) => {
          acc.push(next.id);
          return acc;
        }, []);

        const productCategoryIds = this.product.categories.reduce(
          (acc, next) => {
            acc.push(next.id);
            return acc;
          },
          []
        );

        const result = productCategoryIds.filter((item) =>
          itemCategoryIds.includes(item)
        );

        return result.length && item.id !== this.product.id ? item : false;
      });
      if (this.relatedProducts.length > 4) {
        this.relatedProducts.length = 4;
      }
    }
  },
};
</script>

<style scoped>
.related-products {
  text-decoration: underline;
  text-decoration-color: #9e7d24;
}

.product {
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.17);
  border-radius: 10px;
}

.product.col-lg-6 {
  flex: 1 0 45%;
}

img {
  box-shadow: 1px 2px 11px 3px rgba(0, 0, 0, 0.06);
  border-radius: 10px;
}
</style>