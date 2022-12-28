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
        <ClubHeader :isTextBunner="true" />
        <Nuxt />
        <ClubFooter />
      </div>
      <div
        hidden
        id="snipcart"
        data-api-key="ODhhNWUxOGEtNTk0OC00OTQwLWJkOWMtM2M1ZmNjODU1ZDJhNjM3MzMyNzM0NjM1OTMyNjcz"
      ></div>
      <notifications group="all" position="bottom right" />
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
  async mounted() {
    try {
      const finger_print = this.fingerprint();
      this.socket = this.$nuxtSocket({ channel: "/" });
      this.socket.emit("addVisitor", { finger_print });
    } catch (e) {
      console.warn(e);
    }

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
</style>

