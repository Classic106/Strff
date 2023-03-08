<template>
  <div
    v-if="loading"
    class="w-100 h-100 d-flex align-items-center justify-content-center"
  >
    <Loader />
  </div>
  <div v-else class="d-flex flex-column py-2 p-1">
    <div class="d-flex justify-content-end align-items-center mb-2">
      <span class="mr-2">deliveres</span>
      <BFormCheckbox v-model="check" switch />
      <span>boxes</span>
    </div>
    <Deliveries v-if="!check" />
    <Boxes v-else />
  </div>
</template>

<script>
import { mapActions } from "vuex";

import Loader from "~/components/common/Loader";
import Deliveries from "./Deliveries.vue";
import Boxes from "./Boxes.vue";

export default {
  name: "AdminDeliveryBoxes",
  components: { Deliveries, Boxes, Loader },
  data: () => ({
    loading: true,
    check: false,
  }),
  methods: {
    ...mapActions({
      getDeliveries: "admin_delivery/getDeliveries",
      getBoxes: "admin_delivery/getBoxes",
    }),
  },
  async mounted() {
    this.loading = true;
    await this.getDeliveries();
    await this.getBoxes();
    this.loading = false;
  },
};
</script>

<style scoped>
</style>