<template>
  <div class="w-100 p-0">
    <div
      v-if="loading"
      class="d-flex align-items-center justify-content-center h-100"
    >
      <Loader />
    </div>
    <vueCustomScrollbar
      class="row justify-content-center m-0 w-100 h-100 p-2"
      :settings="itemsSettings"
      v-else
    >
      <div
        v-for="product in products"
        :key="product.id"
        class="product col-sm-6 col-md-4 col-lg-3 p-3 m-2"
      >
        <AdminProductCard :product="product" />
      </div>
    </vueCustomScrollbar>
  </div>
</template>

<script>
import Loader from "~/components/common/Loader";
import AdminProductCard from "./AdminProductCard.vue";

export default {
  name: "AdminProducts",
  components: { Loader, AdminProductCard },
  data: () => ({
    products: [],
    loading: true,
    itemsSettings: {
      suppressScrollX: true,
      wheelPropagation: true,
    },
  }),
  async mounted() {
    this.loading = true;
    this.products = await this.$strapi.find("products");
    //this.products.length = 2;
    //console.log(this.products);
    this.loading = false;
  },
};
</script>

<style scoped>
@media (min-width: 300px) {
  .product.col-sm-6 {
    flex: 0 0 44%;
    max-width: 44%;
  }
}

@media (min-width: 768px) {
  .product.col-md-4 {
    flex: 0 0 31%;
    max-width: 31%;
  }
}

@media (min-width: 992px) {
  .product.col-lg-3 {
    flex: 0 0 23%;
    max-width: 23%;
  }
}

.product {
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.17);
  border-radius: 10px;
}

.product:hover {
  transform: scale(1.01);
}
</style>