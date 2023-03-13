<template>
  <BModal
    v-model="show"
    id="box_modal"
    :title="selectedBox ? 'Edit box' : 'Add box'"
    centered
    size="xl"
  >
    <BoxForm />
    <template #modal-footer>
      <div class="w-100 d-flex justify-content-end">
        <button size="sm" class="btn btn-success mr-2" form="box_form">
          {{ selectedBox ? "Update" : "Add" }}
        </button>
        <button size="sm" class="btn btn-danger" v-on:click="show = false">
          Close
        </button>
      </div>
    </template>
  </BModal>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

import BoxForm from "./BoxForm.vue";

export default {
  name: "BoxModal",
  components: { BoxForm },
  data: () => ({
    show: false,
  }),
  computed: {
    ...mapGetters({
      selectedBox: "admin_delivery/selectedBox",
    }),
  },
  watch: {
    show: function () {
      if (!this.show) {
        this.set_selected_box();
      }
    },
  },
  methods: {
    ...mapMutations({
      set_selected_box: "admin_delivery/set_selected_box",
    }),
  },
};
</script>

<style scoped>
.scroll {
  height: 45vh;
}
</style>