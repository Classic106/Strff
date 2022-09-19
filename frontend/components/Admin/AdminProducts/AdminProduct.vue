<template>
  <div class="d-flex flex-column">
    <div>
      <button v-on:click="setSelectedProduct(null)">
        {{ selectedProduct.id }}<BIconArrowLeft />
      </button>
    </div>
    <div></div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "AdminProduct",
  props: {
    selectedProduct: Object,
  },
  methods: {
    ...mapMutations({ setSelectedProduct: "admin/setSelectedProduct" }),
  },
};
</script>

<style scoped>
</style>