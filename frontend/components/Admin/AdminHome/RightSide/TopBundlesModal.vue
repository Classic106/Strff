<template>
  <BModal
    v-model="show"
    id="top-bundles-modal"
    :title="`${modalData && modalData.index + 1} top bundle`"
    size="lg"
    centered
    hide-footer
  >
    <BundleCard v-if="modalData" :bundle="modalData.bundle" />
  </BModal>
</template>

<script>
import BundleCard from "~/components/Admin/common/BundleCard.vue";

export default {
  name: "TopBundlesModal",
  props: {
    modalData: Object | null,
  },
  components: { BundleCard },
  data: () => ({ show: false }),
};
</script>

<style scoped>
</style>