<template>
  <BModal v-model="show" :id="id" title="Confirm delete" centered>
    <span class="w-100 text-center">Are you shure ?</span>
    <template #modal-footer>
      <div class="w-100 d-flex justify-content-end">
        <button size="sm" class="btn btn-light mr-2" v-on:click="show = false">
          Cancel
        </button>
        <button size="sm" class="btn btn-danger" v-on:click="remove">
          Detete
        </button>
      </div>
    </template>
  </BModal>
</template>

<script>
export default {
  name: "ConfirmDeleteImageModal",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    show: false,
  }),
  methods: {
    remove: function () {
      this.$emit("confirm");
      this.show = false;
    },
  },
};
</script>

<style scoped>
</style>