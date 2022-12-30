<template>
  <DefaultLayout>
    <div class="flex justify-center h-100">
      <div
        v-if="loading"
        class="
          loading
          w-100
          h-100vh
          d-flex
          justify-content-center
          align-items-center
        "
      >
        <Loader />
      </div>
      <div v-else class="flex flex-col">
        <ClubHeader />
        <Nuxt class="nuxt" />
        <ClubFooter />
      </div>
      <div
        hidden
        id="snipcart"
        data-api-key="ODhhNWUxOGEtNTk0OC00OTQwLWJkOWMtM2M1ZmNjODU1ZDJhNjM3MzMyNzM0NjM1OTMyNjcz"
      ></div>
    </div>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from "~/layouts/default.vue";

import ClubHeader from "@/components/Header";
import ClubFooter from "@/components/Footer";
import Loader from "@/components/common/Loader.vue";

export default {
  components: {
    DefaultLayout,
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
.h-100vh {
  height: 100vh !important;
}

.loading {
  background: #333333;
}

.nuxt {
  min-height: 90vh;
}
</style>

