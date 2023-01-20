<template>
  <div class="row justify-content-center w-100">
    <div class="col-10 mt-3">
      <div class="d-flex w-100 mb-3 d-flex align-items-center">
        <button v-on:click="$emit('setIsTable')" class="mr-3">
          <BIconArrowLeft />
        </button>
        <h6 class="m-0">Create bundle</h6>
      </div>
      <div class="block mb-3 p-3">
        <BundleForm />
        <button class="btn btn-success mb-3 w-100" form="add-bundle-form">
          Create bundle
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import BundleForm from "../BundleForm";

export default {
  name: "CreateBundle",
  components: { BundleForm },
  async beforeMount() {
    this.products = await this.$strapi.find("products");
  },
};
</script>

<style scoped>
</style>