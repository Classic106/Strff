<template>
  <Products :products="this.products" :error="error" />
</template>

<script>
import Products from "~/components/products/Products";

export default {
  layout: "club",
  data() {
    return {
      products: [],
      error: null,
    };
  },
  async mounted() {
    try {
      /*this.products = await this.$strapi.$categories.findOne(
        this.$route.params.id
      );*/
      const a = await this.$strapi.$products.find();
      this.products = new Array(120).fill(a[0]);
    } catch (error) {
      this.error = error;
    }
  },
  components: {
    Products,
  },
};
</script>
