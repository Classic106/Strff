<template>
  <BModal
    v-model="show"
    id="top-products-modal"
    :title="`${modalData && modalData.index + 1} top product`"
    size="lg"
    centered
    hide-footer
  >
    <div class="row" v-if="modalData">
      <div class="wrap-img col-3 position-relative">
        <PreloaderImage :image="modalData.product.image[0].url" />
      </div>
      <div class="col-7 d-flex align-items-center">
        <p class="text-ellipsis m-0">{{ modalData.product.title }}</p>
      </div>
      <div class="col-2 d-flex justify-content-end align-items-center">
        <p class="m-0 text-nowrap pr-2">
          $ {{ modalData.product.price | formatNumber }}
        </p>
      </div>
    </div>
  </BModal>
</template>

<script>
import "~/utils/filters";
import PreloaderImage from "~/components/common/PreloaderImage.vue";

export default {
  name: "TopProductsModal",
  props: {
    modalData: Object | null,
  },
  components: { PreloaderImage },
  data: () => ({ show: false }),
};
</script>

<style scoped>
</style>