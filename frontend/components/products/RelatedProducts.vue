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
    <div class="products row justify-content-center m-0">
      <div
        class="product col-10 col-md-4 col-lg-3 p-4 p-lg-3 m-2"
        v-for="product in relatedProducts"
        :key="product.id"
      >
        <nuxt-link :to="`/products/${product.id}`" class="h-100">
          <div class="d-flex h-100 flex-column justify-content-between">
            <PreloaderImage
              :classStyle="'my-auto'"
              :image="product.image[0].url"
            />
            <div class="d-flex flex-lg-column justify-content-between mt-3">
              <span class="font-weight-light text-center col-black text-nowrap">
                ${{ product.price | formatNumber }}
              </span>
              <span
                class="font-weight-light text-center gold text-ellipsis"
                v-html="colorTitleNumbers(product.title, 'col-black')"
              >
              </span>
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { colorTitleNumbers } from "~/helpers";
import PreloaderImage from "~/components/PreloaderImage";

export default {
  name: "RelatedProducts",
  props: {
    product: Object,
  },
  components: { PreloaderImage },
  data: () => ({
    relatedProducts: [],
  }),
  methods: { colorTitleNumbers },
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
</style>