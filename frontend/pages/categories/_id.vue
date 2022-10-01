<template>
  <Products :products="this.products" :error="error" />
</template>

<script>
import { mapGetters } from "vuex";
import Products from "~/components/products/Products";

export default {
  layout: "club",
  components: { Products },
  data() {
    return {
      products: [],
      error: null,
      categories: []
    };
  },
  async mounted() {
    this.categories = await this.$strapi.find('categories');
    const category = this.categories.filter(
      (item) => item.slug === this.$route.params.id
    );
    if (category.length) {
      this.products = category[0].products;
    }
  },
};
</script>
