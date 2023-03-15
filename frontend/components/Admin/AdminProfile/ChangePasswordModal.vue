<template>
  <BModal v-model="show" id="peset-password" title="Change password" centered>
    <form
      ref="form"
      id="passwords"
      class="was-validated"
      @submit.stop.prevent="submit"
    >
      <div class="mb-4">
        <label class="d-flex mb-2" for="new_password"> New password </label>
        <div class="col position-relative p-0">
          <input
            id="new_password"
            :type="showPassword ? 'text' : 'password'"
            :pattern="'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,30}$'"
            class="form-control w-100 pr-5"
            required
            placeholder="New password"
            v-model="form.password"
          />
          <BIconEyeFill
            v-if="showPassword"
            class="icon position-absolute"
            v-on:click="showPassword = false"
          />
          <BIconEyeSlashFill
            v-else
            class="icon position-absolute"
            v-on:click="showPassword = true"
          />
          <div class="invalid-feedback">
            <div class="d-flex align-items-center">
              Password must be from 8 to 30 symbols with !@#$%^&*_=+-
            </div>
          </div>
        </div>
      </div>
      <div class="mb-4">
        <label class="d-flex mb-2" for="confirm_password"> New password </label>
        <div class="col position-relative p-0">
          <input
            id="confirm_password"
            :type="showPasswordConfirmation ? 'text' : 'password'"
            :pattern="
              isSamePasswords
                ? '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,30}$'
                : ''
            "
            required
            class="form-control w-100 pr-5"
            placeholder="Confirm password"
            v-model="form.passwordConfirmation"
          />
          <BIconEyeFill
            v-if="showPasswordConfirmation"
            class="icon position-absolute"
            v-on:click="showPasswordConfirmation = false"
          />
          <BIconEyeSlashFill
            v-else
            class="icon position-absolute"
            v-on:click="showPasswordConfirmation = true"
          />
          <div class="invalid-feedback">
            <div class="d-flex align-items-center">passwords aren't equal</div>
          </div>
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
          :disabled="!isSamePasswords"
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
    isSamePasswords: false,
    form: {
      password: "",
      passwordConfirmation: "",
    },
  }),
  computed: {
    ...mapGetters({ user: "auth/user" }),
  },
  watch: {
    form: {
      handler: function () {
        const { password, passwordConfirmation } = this.form;
        this.isSamePasswords = password === passwordConfirmation;
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions({
      changeUserPassword: "auth/changeUserPassword",
    }),
    submit: async function () {
      if (!this.isSamePasswords) {
        return;
      }

      const { form } = this;
      await this.changeUserPassword(form);
    },
  },
};
</script>

<style scoped>
.icon {
  top: 10px;
  right: 0;
  margin-right: 7%;
}
</style>