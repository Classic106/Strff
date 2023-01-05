<template>
  <BModal
    v-model="show"
    id="top-products-modal"
    :title="`${modalData && modalData.index + 1} top product`"
    size="lg"
    centered
    hide-footer
  >
    <ProductCard v-if="modalData" :product="modalData.product" />
  </BModal>
</template>

<script>
import ProductCard from "~/components/Admin/common/ProductCard.vue";

export default {
  name: "TopProductsModal",
  props: {
    modalData: Object | null,
  },
  components: { ProductCard },
  data: () => ({ show: false }),
};
</script>

<style scoped>
</style>