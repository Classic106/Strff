<template>
  <div class="d-flex justify-center">
    <div class="d-flex flex-column">
      <Header />
      <Nuxt class="flex-grow" />
      <ProductsFooter />
    </div>
    <div
      hidden
      id="snipcart"
      data-api-key="ODhhNWUxOGEtNTk0OC00OTQwLWJkOWMtM2M1ZmNjODU1ZDJhNjM3MzMyNzM0NjM1OTMyNjcz"
    ></div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import ProductsFooter from "@/components/products/Footer";

export default {
  components: {
    Header,
    ProductsFooter,
  },
};
</script>
