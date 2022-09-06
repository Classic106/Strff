<template>
  <div>
    <main v-if="error">
      {{ error }}
    </main>
    <main
      v-else-if="!products.length"
      class="main d-flex justify-content-center"
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
          col-10 col-md-7 col-lg-3
          mb-3
          mx-md-2
          p-4
          mx-2
        "
      >
        <nuxt-link
          :to="`/products/${product.id}`"
          class="h-100 d-flex flex-column"
        >
          <img
            class="mb-2 w-100 my-auto"
            :src="`${getFirstImage(product.image)}`"
          />
          <div class="mb-0 mt-auto">
            <h6
              class="
                text-ellipsis
                col-black
                text-upprcase
                m-2
                mb-4
                text-uppercase text-nowrap
              "
            >
              {{ product.title }}
            </h6>
            <h5 class="gold d-flex justify-content-center m-3 price">
              {{ product.price }} $
            </h5>
          </div>
        </nuxt-link>
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
import { getStrapiMedia } from "~/utils/medias";

export default {
  props: {
    products: Array,
    error: Object,
    storeUrl: String,
  },
  methods: {
    getStrapiMedia,
    getFirstImage: function (images) {
      if (images[0]) {
        return this.getStrapiMedia(images[0].url);
      }
      return this.getStrapiMedia("/uploads/image_not_found_8c8e4b17cc.jpg");
    },
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

img {
  /*box-shadow: 1px 2px 11px 3px rgba(0, 0, 0, 0.06);*/
  border-radius: 10px;
}
</style>
