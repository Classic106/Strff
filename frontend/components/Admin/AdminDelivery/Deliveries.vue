<template>
  <div>
    <div class="d-flex flex-column">
      <div class="d-flex justify-content-end mb-2">
        <button
          class="btn btn-primary mr-1"
          v-on:click="openDeliveryModal(null)"
        >
          Add delivery
        </button>
      </div>
      <div v-if="!deliveries.length">
        <p class="text-center">Deliveries is not found</p>
      </div>
      <ul v-else class="d-flex flex-column p-3">
        <li
          v-for="delivery in deliveries"
          :key="delivery.id"
          class="mb-2"
          v-on:click="openDeliveryModal(delivery)"
        >
          <div class="row">
            <div class="col-2">
              <PreloaderImage :image="delivery.logo && delivery.logo.url" />
            </div>
            <div
              class="col-10 d-flex justify-content-between align-items-center"
            >
              <p class="text-ellipsis m-0">{{ delivery.title }}</p>
              <div>
                <button
                  class="btn btn-danger my-auto"
                  v-on:click.stop="remove(delivery.id)"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <DeliveryModal />
    <ConfirmModal :id="'confirm-delete-delivery'" v-on:confirm="confirm" />
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

import PreloaderImage from "~/components/common/PreloaderImage.vue";
import ConfirmModal from "~/components/Admin/common/ConfirmModal.vue";
import DeliveryModal from "./DeliveryModal.vue";
import BoxModal from "./BoxModal.vue";

export default {
  name: "Deliveries",
  components: { PreloaderImage, DeliveryModal, BoxModal, ConfirmModal },
  data: () => ({
    deleteId: null,
  }),
  computed: {
    ...mapGetters({
      deliveries: "admin_delivery/deliveries",
    }),
  },
  methods: {
    ...mapMutations({
      set_selected_delivery: "admin_delivery/set_selected_delivery",
    }),
    ...mapActions({
      deleteDelivery: "admin_delivery/deleteDelivery",
    }),
    openDeliveryModal: function (delivery = null) {
      this.set_selected_delivery(delivery);
      this.$root.$emit("bv::show::modal", "delivery_modal");
    },
    remove(id) {
      this.deleteId = id;
      this.$root.$emit("bv::show::modal", "confirm-delete-delivery");
    },
    confirm: async function () {
      const { deleteId } = this;
      this.deleteDelivery(deleteId);
      this.deleteId = null;
    },
  },
};
</script>

<style scoped>
</style>