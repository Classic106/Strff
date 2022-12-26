<template>
  <BModal v-model="show" id="peset-password" title="Change password" centered>
    <form ref="form" id="passwords" @submit.stop.prevent="handleSubmit">
      <div class="mb-4">
        <label class="d-flex mb-2" for="new_password"> New password </label>
        <div
          class="
            d-flex
            position-relative
            align-items-center
            justify-content-end
          "
        >
          <input
            id="new_password"
            :type="showPassword ? 'text' : 'password'"
            class="w-100 pr-4"
            placeholder="New password"
            v-model="form.password"
          />
          <BIconEyeFill
            v-if="showPassword"
            class="position-absolute mr-2"
            v-on:click="showPassword = false"
          />
          <BIconEyeSlashFill
            v-else
            class="position-absolute mr-2"
            v-on:click="showPassword = true"
          />
        </div>
      </div>
      <div class="mb-4">
        <label class="d-flex mb-2" for="confirm_password"> New password </label>
        <div
          class="
            d-flex
            position-relative
            align-items-center
            justify-content-end
          "
        >
          <input
            id="confirm_password"
            :type="showPasswordConfirmation ? 'text' : 'password'"
            class="w-100 pr-4"
            placeholder="Confirm password"
            v-model="form.passwordConfirmation"
          />
          <BIconEyeFill
            v-if="showPasswordConfirmation"
            class="position-absolute mr-2"
            v-on:click="showPasswordConfirmation = false"
          />
          <BIconEyeSlashFill
            v-else
            class="position-absolute mr-2"
            v-on:click="showPasswordConfirmation = true"
          />
        </div>
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
          Change
        </button>
      </div>
    </template>
  </BModal>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ChangePasswordModal",
  data: () => ({
    show: false,
    showPassword: false,
    showPasswordConfirmation: false,
    form: {
      password: "",
      passwordConfirmation: "",
    },
  }),
  computed: {
    ...mapGetters({ user: "auth/user" }),
  },
  methods: {
    ...mapActions({ changeUserPassword: "auth/changeUserPassword" }),
    handleSubmit: async function () {
      const { form } = this;
      await this.changeUserPassword(form);
    },
  },
};
</script>

<style scoped>
</style>