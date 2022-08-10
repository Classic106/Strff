<template>
  <div
    v-if="relatedProducts.length"
    class="d-flex flex-column d-none d-md-flex mx-0 px-0 mt-5"
  >
    <h6
      class="
        text-uppercase
        related-products
        align-self-start
        text-nowrap text-lg-left text-center
        gold
        m-0
        w-100
      "
    >
      related products
    </h6>
    <div class="products row justify-content-center">
      <nuxt-link
        :to="`/products/${product.id}`"
        class="product col-10 col-md-4 col-lg-2 p-4 p-lg-3 m-2"
        v-for="product in relatedProducts"
        :key="product.id"
      >
        <div>
          <img :src="`${getFirstImage(product.image)}`" class="m-auto" />
          <div class="d-flex flex-lg-column justify-content-between mt-3">
            <span class="font-weight-light text-center col-black text-nowrap">
              ${{ product.price | formatNumber }}
            </span>
            <span class="font-weight-light text-center gold">
              {{ product.title }}
            </span>
          </div>
        </div>
      </nuxt-link>
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

      if (this.relatedProducts.length > 6) {
        this.relatedProducts.length = 6;
      }
    }
  },
};
</script>

<style scoped>
@media (min-width: 768px) {
  .col-md-4 {
    flex: 0 0 31%;
    max-width: 31%;
  }
}

@media (min-width: 992px) {
  .col-lg-2 {
    flex: 0 0 15%;
    max-width: 15%;
  }
}

.related-products {
  padding: 20px;
  background-color: #000;
}

.products {
  padding: 40px 0;
  background-color: #f5f5f5;
}

.product {
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.17);
  border-radius: 10px;
  background-color: #fff;
}

.product:hover {
  transform: scale(1.01);
}

img {
  box-shadow: 1px 2px 11px 3px rgba(0, 0, 0, 0.06);
  border-radius: 10px;
}
</style>