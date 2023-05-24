<template>
  <div class="col">
    <label class="d-flex font-weight-bold" for="email-text">Delete</label>
    <form v-on:submit.prevent.stop="submit">
      <input
        type="text"
        id="delete_email"
        class="form-control w-100"
        v-model.trim="email"
        :class="email ? (isValid ? 'is-valid' : 'is-invalid') : ''"
      />
      <p v-if="result">Successully deleted</p>
      <div class="row m-0 p-0 justify-content-end align-items-center mt-2">
        <Loader v-if="loading" class="mr-2" small />
        <button
          class="btn btn-danger"
          type="submit"
          :disabled="email && !isValid"
        >
          Delete
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

import {emailPattern } from "~/patterns";

import Loader from "~/components/common/Loader";

export default {
  name: "DeleteEmail",
  components: { Loader },
  data: () => ({
    email: "",
    isValid: true,
    loading: false,
    result: false,
  }),
  watch: {
    email: function () {
      const { email } = this;

      const match = email.match(emailPattern);
      this.isValid = !!match;
    },
  },
  methods: {
    ...mapActions({
      deleteEmail: "admin_emails/deleteEmail",
    }),
    submit: async function () {
      this.loading = true;
      const result = await this.deleteEmail(this.email);
      if (result && result.length) {
        this.result = true;
      }
      this.loading = false;
    },
  },
};
</script>

<style scoped>
</style>