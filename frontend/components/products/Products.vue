<template>
  <main v-if="error">
    {{ error }}
  </main>
  <main
    v-else-if="!products.length"
    class="main d-flex justify-content-center h-100vh"
  >
    <h6 class="no-items text-center my-auto">There aren't any products</h6>
  </main>
  <main
    v-else
    class="
      content
      row
      h-100
      justify-content-center
      px-md-1 px-0
      py-5
      mx-md-5
      m-0
    "
  >
    <div
      v-for="product in products"
      :key="product.id"
      class="
        product
        d-flex
        flex-column
        justify-content-between
        col-10 col-sm-6 col-lg-3
        mb-3
        mx-md-2
        p-4
        mx-2
      "
    >
      <ProductCard :product="product" />
    </div>
  </main>
</template>

<script>
import ProductCard from "~/components/products/ProductCard";

export default {
  props: {
    products: Array,
    error: Object,
    storeUrl: String,
  },
  components: { ProductCard },
};
</script>

<style scoped>
@media (min-width: 350px) {
  .product.col-sm-6 {
    flex: 0 0 45%;
    max-width: 45%;
  }
}

@media (min-width: 992px) {
  .product.col-lg-3 {
    flex: 0 0 23%;
    max-width: 23%;
  }
}

.main {
  height: 70vh;
}

.btn:hover {
  color: none;
}

.content {
  margin-left: 35px;
  margin-right: 35px;
}

.price {
  font-size: 1.5rem;
}

.product {
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.17);
  border-radius: 10px;
}

.product:hover {
  transform: scale(1.01);
}
</style>
