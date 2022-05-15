<template>
  <div class="flex justify-center bg-gray-200">
    <div
      v-if="loading"
      class="loading w-100 d-flex justify-content-center align-items-center"
    >
      <Loader />
    </div>
    <div v-else class="max-w-screen-lg flex flex-col min-h-screen w-full">
      <ClubHeader />
      <Nuxt class="flex-grow" />
      <ClubFooter />
    </div>
  </div>
</template>

<script>
import ClubHeader from "@/components/ClubHeader";
import ClubFooter from "@/components/ClubFooter";
import Loader from "@/components/Loader.vue";

export default {
  components: {
    ClubHeader,
    ClubFooter,
    Loader,
  },
  
  data: () => ({ loading: true }),
  mounted() {
    this.loading = false;
  },
};
</script>

<style>
</style>

