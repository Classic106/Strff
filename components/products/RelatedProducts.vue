<template>
  <div class="d-flex flex-column mt-5 d-none d-md-flex">
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
        class="col-8 col-lg-5"
      >
        <nuxt-link :to="`/products/${product.slug}`">
          <img :src="`${getStrapiMedia(product.image.url)}`" class="m-auto" />
          <span class="font-weight-light mt-3 text-center col-black">
            ${{ product.price | formatNumber }}
          </span>
          <span class="font-weight-light text-center col-black">
            {{ product.title }}
          </span>
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
  methods: { getStrapiMedia },
  async mounted() {
    const products = await this.$strapi.find("products");
    this.relatedProducts = products;
    /*if (this.product.categories.length && products.length) {
      this.relatedProducts = products.filter((item) => {
        const result = item.cat.filter(
          (i) => this.product.categories.indexOf(i) > -1
        );
        return result.length ? item : false;
      });
    }*/
    console.log(this.relatedProducts);
  },
};
</script>

<style scoped>
.related-products {
  text-decoration: underline;
  text-decoration-color: #9e7d24;
}
</style>