<template>
  <BModal v-model="show" :id="id" title="Confirm delete" centered>
    <span class="w-100 text-center">Are you shure ?</span>
    <template #modal-footer>
      <div class="w-100 d-flex justify-content-end">
        <button size="sm" class="btn btn-light mr-2" v-on:click="cancel">
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
  name: "ConfirmModal",
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
    cancel: function () {
      this.$emit("cancel");
      this.show = false;
    },
    remove: function () {
      this.$emit("confirm");
      this.show = false;
    },
  },
};
</script>

<style scoped>
</style>