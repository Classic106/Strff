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
import qs from "qs";

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
      const queryData = {
        _sort: `sales:DESC`,
        _limit: 4,
      };
      const query = qs.stringify(queryData);

      const { data } = await this.$axios.get(`/products?${query}`);
      this.products = this.shuffleArray(data);
    } catch (e) {
      error(e);
    }
  },
};
</script>

<style scoped>
</style>