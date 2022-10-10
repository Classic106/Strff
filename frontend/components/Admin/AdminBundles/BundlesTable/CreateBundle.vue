<template>
  <div class="row justify-content-center w-100">
    <div class="col-10 mt-3">
      <div class="d-flex w-100 mb-3 d-flex align-items-center">
        <button v-on:click="$emit('setIsTable')" class="mr-3">
          <BIconArrowLeft />
        </button>
        <h6 class="m-0">Create bundle</h6>
      </div>
      <BundleForm class="block mb-3 p-3" v-on:getBundle="getBundle" />
      <button class="btn btn-success mb-3 w-100" v-on:click="save">
        Create bundle
      </button>
    </div>
  </div>
</template>

<script>
import BundleForm from "../BundleForm";

export default {
  name: "CreateBundle",
  components: { BundleForm },
  data: () => ({ bundle: null }),
  methods: {
    getBundle: function (data) {
      this.bundle = data;
    },
    save: function () {
      console.log(this.bundle);
    },
  },
  async beforeMount() {
    this.products = await this.$strapi.find("products");
  },
};
</script>

<style scoped>
.block {
  border: 1px solid #000;
  border-radius: 10px;
  background-color: #fff;
}
</style>