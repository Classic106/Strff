<template>
  <div class="col">
    <label class="d-flex font-weight-bold" for="email-text">Delete</label>
    <form v-on:submit.prevent.stop="submit">
      <input
        type="text"
        id="delete_email"
        class="form-control w-100"
        v-model="email"
        :class="email ? (isValid ? 'is-valid' : 'is-invalid') : ''"
        pattern="^[a-z0-9._%+-]{0,300}@[a-z0-9.-]{0,50}\.[a-z]{3,4}$"
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

      const split = email.split("\n");
      const match = email.match(
        /^([a-z0-9._%+-]{0,300}@[a-z0-9.-]{0,50}\.[a-z]{3,4})[\t\n]*$/gm
      );

      const splitResult = split && split.length;
      const matchResult = match && match.length;

      this.isValid = splitResult === matchResult;
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