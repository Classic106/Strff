<template>
  <BundleTable v-if="isTable" v-on:setIsTable="isTable = false" />
  <CreateBundle v-else v-on:setIsTable="isTable = true" />
</template>

<script>
import CreateBundle from "./CreateBundle.vue";
import BundleTable from "./BundleTable.vue";

export default {
  name: "BundlesTable",
  components: { CreateBundle, BundleTable },
  data: () => ({ isTable: true }),
};
</script>

<style scoped>
</style>