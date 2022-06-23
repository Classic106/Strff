<template>
  <div class="flex justify-center h-100">
    <div
      v-if="loading"
      class="
        loading
        w-100
        h-100
        d-flex
        justify-content-center
        align-items-center
      "
    >
      <Loader />
    </div>
    <div v-else class="flex flex-col">
      <ClubHeader />
      <Nuxt />
      <ClubFooter />
    </div>
    <div
      hidden
      id="snipcart"
      data-api-key="ODhhNWUxOGEtNTk0OC00OTQwLWJkOWMtM2M1ZmNjODU1ZDJhNjM3MzMyNzM0NjM1OTMyNjcz"
    ></div>
  </div>
</template>

<script>
import ClubHeader from "@/components/Header";
import ClubFooter from "@/components/Footer";
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

<style scoped>
.h-100 {
  height: 100vh !important;
}
</style>

