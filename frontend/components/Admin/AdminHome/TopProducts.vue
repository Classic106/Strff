<template>
  <div>
    <div class="d-flex justify-content-between">
      <p class="text-uppercase">top products</p>
      <p>Today</p>
    </div>
    <span v-if="!topTodayProducts.length"
      >There were no products sold during this time</span
    >
    <ol v-else class="d-flex flex-column p-0">
      <li v-for="(product, index) in topTodayProducts" :key="product.id">
        <a
          href="/#"
          class="d-flex w-100"
          v-on:click.prevent="
            openModal('top-products-modal', { product, index })
          "
        >
          <span class="text-ellipsis">{{ product.title }}</span></a
        >
      </li>
    </ol>
    <TopProductsModal :modalData="modalData" />
  </div>
</template>

<script>
import TopProductsModal from "./TopProductsModal.vue";

export default {
  name: "TopProducts",
  props: {
    topTodayProducts: Array,
  },
  data: () => ({
    modalData: null,
  }),
  components: { TopProductsModal },
  methods: {
    openModal: function (modal, modalData) {
      this.modalData = modalData;
      this.$root.$emit("bv::show::modal", modal);
    },
  },
};
</script>

<style scoped>
</style>