<template>
  <div class="p-3">
    <p class="text-uppercase">best sellers products</p>
    <div class="row justify-content-center w-100 m-0">
      <ProductCard
        class="col-6 p-0 m-1"
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script>
import qs from "qs";

import { error } from "~/utils/error.js";

import ProductCard from "~/components/Admin/common/ProductCard.vue";

export default {
  name: "BestSellersProducts",
  data: () => ({
    products: [],
  }),
  components: { ProductCard },
  async mounted() {
    try {
      const queryData = {
        _sort: `sales:DESC`,
        _limit: 4,
      };
      const query = qs.stringify(queryData);

      const { data } = await this.$axios.get(`/products?${query}`);
      this.products = data;
    } catch (e) {
      error(e);
    }
  },
};
</script>

<style scoped>
.col-6 {
  flex: 0 0 48%;
  max-width: 48%;
}
</style>