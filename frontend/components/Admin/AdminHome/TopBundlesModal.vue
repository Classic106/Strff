<template>
  <BModal
    v-model="show"
    id="top-bundles-modal"
    :title="`${modalData && modalData.index + 1} top bundle`"
    size="lg"
    centered
    hide-footer
  >
    <div class="row align-item-center" v-if="modalData">
      <div class="col-3 d-flex align-items-center">
        <div class="wrap-img">
          <PreloaderImage
            :image="modalData.bundle.products[0].image[0].url"
            class="p-0"
          />
        </div>
        +
        <div class="wrap-img">
          <PreloaderImage :image="modalData.bundle.products[1].image[0].url" />
        </div>
      </div>
      <div class="col-5 d-flex align-items-center">
        <p class="text-ellipsis m-0">{{ modalData.bundle.title }}</p>
      </div>
      <div class="col-4 d-flex justify-content-end align-items-center">
        <p class="m-0 text-nowrap pr-3">
          $ {{ modalData.bundle.price | formatNumber }}
        </p>
      </div>
    </div>
  </BModal>
</template>

<script>
import "~/utils/filters";
import PreloaderImage from "~/components/common/PreloaderImage.vue";

export default {
  name: "TopBundlesModal",
  props: {
    modalData: Object | null,
  },
  components: { PreloaderImage },
  data: () => ({ show: false }),
};
</script>

<style scoped>
</style>