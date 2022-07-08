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
        class="col-8 col-lg-6"
      >
        <nuxt-link :to="`/products/${product.slug}`">
          <img
            :src="`${getFirstImage(product.image)}`"
            class="m-auto gold-border"
          />
          <div class="d-flex justify-content-between mt-3">
            <span class="font-weight-light text-center col-black text-nowrap">
              ${{ product.price | formatNumber }}
            </span>
            <span class="font-weight-light text-center col-black text-nowrap">
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
    }
  },
};
</script>

<style scoped>
.related-products {
  text-decoration: underline;
  text-decoration-color: #9e7d24;
}
</style>