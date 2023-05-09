<template>
  <form class="col" v-on:submit.prevent.stop="submit">
    <div class="row m-0 p-0 justify-content-between mb-2">
      <label class="col-6 d-flex font-weight-bold p-0" for="email-text"
        >Check</label
      >
      <div class="col-6 d-flex justify-content-end p-0">
        <div class="row m-0 p-0 justify-content-end align-items-center mr-2">
          <input
            type="checkbox"
            id="check_email"
            v-model="save"
            class="mr-2 mt-1"
          />
          <label class="d-flex text-muted m-0 p-0" for="check_email">
            <small class="d-flex text-nowrap p-0">save in base</small>
          </label>
        </div>
        <button class="btn btn-warning btn-sm" v-on:click="email = ''">
          Clear
        </button>
      </div>
    </div>
    <input
      type="text"
      id="email-text"
      v-model="email"
      name="emails-text"
      class="form-control w-100"
      :class="email ? (isMatch && isValid ? 'is-valid' : 'is-invalid') : ''"
      placeholder="example@example.com"
      required
    />
    <div class="invalid-feedback mt-2">
      <div class="d-flex align-items-center">
        {{ wrongEmail() }}
      </div>
    </div>
    <div
      class="row justify-content-end align-items-center w-100 m-0 p-0"
      :class="!wrongEmail() || !email ? 'mt-2' : ''"
    >
      <Loader v-if="loading" class="mr-2" small />
      <button type="submit" class="btn btn-success" :disabled="!!wrongEmail()">
        Check
      </button>
    </div>
  </form>
</template>

<script>
import { mapActions } from "vuex";

import Loader from "~/components/common/Loader";

export default {
  name: "CheckEmail",
  components: { Loader },
  data: () => ({
    isValid: true,
    isMatch: true,
    save: true,
    email: "",
    loading: false,
  }),
  watch: {
    email: function () {
      const { email } = this;

      if (!email) {
        this.isValid = true;
        this.isMatch = true;
        return;
      }

      const match = email.match(
        /^[a-z0-9._%+-]{0,100}@[a-z0-9.-]{0,300}\.[a-z]{3,4}$/g
      );

      this.isMatch = !!match;
      this.isValid = true;
    },
  },
  methods: {
    ...mapActions({
      checkEmail: "admin_emails/checkEmail",
    }),
    wrongEmail: function () {
      const { isMatch, isValid } = this;

      if (!isMatch) {
        return "Wrong email";
      }
      if (!isValid) {
        return "Email doesn't exist";
      }
    },
    submit: async function () {
      const { save, email } = this;

      this.loading = true;
      this.isValid = await this.checkEmail({ email, save });
      this.loading = false;
    },
  },
};
</script>

<style scoped>
textarea {
  min-height: 16rem;
  max-height: 36rem;
}
</style>