<template>
  <div>
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
      class="content row justify-content-center px-md-1 px-0 py-5 mx-md-5 m-0"
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
        <button
          v-if="product.status === 'published'"
          class="
            py-2
            px-4
            rounded
            btn
            d-flex
            justify-content-center
            align-items-center
            text-uppercase text-nowrap
            w-100
          "
          v-on:click="addToCart(product)"
        >
          <span class="icon icon-bag mr-2 d-none d-lg-flex"></span>
          Add to cart
        </button>
      </div>
    </main>
  </div>
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
  methods: {
    addToCart(product) {
      const selected = {
        product,
        quantity: 1,
        purchase_type: 1,
        subscription_type: null,
        total: product.price,
      };
      this.$store.dispatch("order/addProduct", selected);
    },
  },
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

button {
  background-color: #1f2020;
  color: #fff;
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

.icon-bag {
  filter: invert(98%) sepia(98%) saturate(0%) hue-rotate(326deg)
    brightness(103%) contrast(102%);
}
</style>
