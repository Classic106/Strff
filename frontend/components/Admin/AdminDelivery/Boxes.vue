<template>
  <div class="d-flex flex-column">
    <div class="d-flex justify-content-end">
      <button v-on:click="openBoxModal(null)" class="btn btn-primary mr-1">
        Add box
      </button>
    </div>
    <div>
      <ul class="d-flex flex-column p-3">
        <li
          v-for="box in boxes"
          :key="box.id"
          v-on:click="openBoxModal(box)"
          class="mb-2"
        >
          <div class="row w-100 align-items-center justify-content-between">
            <BoxVisual :box="box" class="col-3 p-0" v-if="isAvailable" />
            <p class="col-5 m-0 p-2">
              length: {{ box.lengthy }} width: {{ box.width }} height:
              {{ box.height }} volume: {{ box.volume }} weight: {{ box.weight }}
            </p>
            <button
              class="btn btn-danger my-auto"
              v-on:click.stop="remove(box.id)"
            >
              Delete
            </button>
          </div>
        </li>
      </ul>
    </div>
    <BoxModal />
    <ConfirmModal :id="'confirm-delete-box'" v-on:confirm="confirm" />
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";

import WebGL from "~/utils/WebGL";

import ConfirmModal from "~/components/Admin/common/ConfirmModal.vue";
import BoxVisual from "./BoxVisual.vue";
import BoxModal from "./BoxModal.vue";

export default {
  name: "Boxes",
  components: { BoxModal, ConfirmModal, BoxVisual },
  data: () => ({
    deleteId: null,
    isAvailable: false,
  }),
  computed: {
    ...mapGetters({
      boxes: "admin_delivery/boxes",
    }),
  },
  methods: {
    ...mapMutations({
      set_selected_box: "admin_delivery/set_selected_box",
    }),
    ...mapActions({
      deleteBox: "admin_delivery/deleteBox",
    }),
    openBoxModal: function (box) {
      this.set_selected_box(box);
      this.$root.$emit("bv::show::modal", "box_modal");
    },
    remove(id) {
      this.deleteId = id;
      this.$root.$emit("bv::show::modal", "confirm-delete-box");
    },
    confirm: async function () {
      const { deleteId } = this;
      this.deleteBox(deleteId);
      this.deleteId = null;
    },
  },
  beforeMount() {
    const { isWebGLAvailable } = WebGL;
    this.isAvailable = isWebGLAvailable();
  },
};
</script>

<style scoped>
.button {
  border-radius: 5px;
  background: none;
}
</style>