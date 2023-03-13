<template>
  <BModal
    v-model="show"
    id="delivery_modal"
    :title="selectedDelivery ? 'Edit delivery' : 'Add delivery'"
    centered
    size="xl"
  >
    <DeliveryForm />
    <template #modal-footer>
      <div class="w-100 d-flex justify-content-end">
        <button size="sm" class="btn btn-success mr-2" form="delivery_form">
          {{ selectedDelivery ? "Update" : "Add" }}
        </button>
        <button size="sm" class="btn btn-danger" v-on:click="show = false">
          Close
        </button>
      </div>
    </template>
  </BModal>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

import DeliveryForm from "./DeliveryForm.vue";

export default {
  name: "DeliveryModal",
  components: { DeliveryForm },
  data: () => ({
    show: false,
    settings: {
      suppressScrollX: true,
      wheelPropagation: false,
    },
  }),
  computed: {
    ...mapGetters({
      selectedDelivery: "admin_delivery/selectedDelivery",
    }),
  },
  watch: {
    show: function () {
      if (!this.show) {
        this.set_selected_delivery();
      }
    },
  },
  methods: {
    ...mapMutations({
      set_selected_delivery: "admin_delivery/set_selected_delivery",
    }),
  },
};
</script>

<style scoped>
.scroll {
  height: 45vh;
}
</style>