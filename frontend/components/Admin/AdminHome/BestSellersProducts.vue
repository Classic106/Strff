<template>
  <div class="p-3">
    <p class="text-uppercase">best sellers products</p>
    <div class="row">
      <ProductCard
        class="col-6"
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script>
import { shuffleArray } from "~/helpers";
import { error } from "~/utils/error.js";

import ProductCard from "~/components/Admin/common/ProductCard.vue";

export default {
  name: "BestSellersProducts",
  data: () => ({
    products: [],
  }),
  components: { ProductCard },
  methods: { shuffleArray },
  async mounted() {
    try {
      const result = await this.$strapi.$bestsellers.find();
      this.products = this.shuffleArray(result[0].products);
      this.products.length = 4;
    } catch (e) {
      error(e);
    }
  },
};
</script>

<style scoped>
</style>