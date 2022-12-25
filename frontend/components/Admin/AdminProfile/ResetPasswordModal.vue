<template>
  <BModal v-model="show" id="peset-password" title="Reset password" centered>
    <form ref="form" id="passwords" @submit.stop.prevent="handleSubmit">
      <div class="mb-4">
        <label class="d-flex mb-2" for="new_password"> New password </label>
        <input
          id="new_password"
          type="text"
          class="w-100"
          placeholder="New password"
          v-model="form.password"
        />
      </div>
      <div class="mb-4">
        <label class="d-flex mb-2" for="confirm_password"> New password </label>
        <input
          id="confirm_password"
          type="text"
          class="w-100"
          placeholder="Confirm password"
          v-model="form.passwordConfirmation"
        />
      </div>
    </form>
    <template #modal-footer>
      <div class="w-100 d-flex justify-content-end">
        <button size="sm" class="btn btn-danger mr-2" v-on:click="show = false">
          Cancel
        </button>
        <button
          type="submit"
          form="passwords"
          size="sm"
          class="btn btn-success"
        >
          Reset
        </button>
      </div>
    </template>
  </BModal>
</template>

<script>
export default {
  name: "ResetPasswordModal",
  data: () => ({
    show: false,
    form: {
      password: "",
      passwordConfirmation: "",
    },
  }),
  methods: {
    handleSubmit: function () {
      console.log(this.form);
    },
  },
};
</script>

<style scoped>
</style>