<template>
  <div class="border-black">
    <div class="text-uppercase font-weight-bold p-2 w-100 bundle-products-title">
      check out this bundle:
    </div>
    <div class="p-1">
      <div class="border-black">dgdfh</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BundleProducts",
  props: {
    product: Object,
  },
  data: () => ({
    bundleProducts: [],
  }),
  async mounted() {
    //const bundle = await this.$strapi.find("bundle");
    //this.bundleProducts = bundle;
    //console.log(this.bundleProducts);
  },
};
</script>

<style csoped>
.border-black {
  border: 1px solid #000;
}

.bundle-products-title {
  border-bottom: 1px solid #000;
  background-color: #f5f5f5;
}
</style>