<template>
  <div>
    <div class="d-flex justify-content-between">
      <p class="text-uppercase">top bundles</p>
      <p>Today</p>
    </div>
    <span v-if="!topTodayBundles.length"
      >There were no sales during this time</span
    >
    <ol v-else class="p-0">
      <li v-for="(bundle, index) in topTodayBundles" :key="bundle.id">
        <a
          href="/#"
          class="d-flex w-100"
          v-on:click.prevent="openModal('top-bundles-modal', { bundle, index })"
        >
          <span class="text-ellipsis">{{ bundle.title }}</span></a
        >
      </li>
    </ol>
    <TopBundlesModal :modalData="modalData" />
  </div>
</template>

<script>
import TopBundlesModal from "./TopBundlesModal.vue";

export default {
  name: "TopBundles",
  props: {
    topTodayBundles: Array,
  },
  data: () => ({
    modalData: null,
  }),
  components: { TopBundlesModal },
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