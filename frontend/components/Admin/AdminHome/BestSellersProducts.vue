<template>
  <div class="p-3">
    <p class="text-uppercase">best sellers products</p>
    <div class="row justify-content-center w-100 m-0">
      <ProductCard
        class="col-6 p-0 m-1"
        v-for="product in best_sellers"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import ProductCard from "~/components/Admin/common/ProductCard.vue";

export default {
  name: "BestSellersProducts",
  components: { ProductCard },
  computed: {
    ...mapGetters({
      best_sellers: "best_sellers/best_sellers",
    }),
  },
};
</script>

<style scoped>
.col-6 {
  flex: 0 0 48%;
  max-width: 48%;
}
</style>