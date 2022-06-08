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
      this.products = await this.$strapi.$products.find();
    } catch (error) {
      this.error = error;
    }
  },
  components: {
    Products,
  },
};
</script>
