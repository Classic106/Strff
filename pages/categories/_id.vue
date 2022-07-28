<template>
  <Products :products="products" :error="error" />
</template>

<script>
import { mapGetters } from "vuex";
import Products from "~/components/products/Products";

export default {
  layout: "club",
  components: { Products },
  data: () => ({
    products: [],
    error: null,
  }),
  computed: { ...mapGetters({ categories: "categories/categories" }) },
  mounted() {
    const catgory = this.categories.filter(
      (item) => item.slug === this.$route.params.id
    );

    if (catgory.length) {
      this.products = catgory[0].products;
    }
  },
};
</script>
